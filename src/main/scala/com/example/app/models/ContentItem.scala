package com.example.app.models

import com.example.app.{AppGlobals, HasIntId, Tables, Updatable}
import slick.driver.PostgresDriver.api._

import scala.concurrent.Await
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.Duration

case class ContentItem(id: Int = 0, name: String, gameId: Int) extends HasIntId[ContentItem]{
  def updateId(id: Int) = this.copy(id = id)
}

case class OneFullContentItem(id: Int = 0,
                              gameId: Int,
                              name: String,
                              startMillis: Long,
                              description: String,
                              rating: Option[Double],
                              started: Boolean,
                              ended: Boolean,
                              streamLink: Option[String],
                              vodLink: Option[String],
                              imageLink: Option[String]) {
  def contentItem =
    ContentItem(id, name, gameId)

  def contentItemVersion =
    if(id != 0)
      Some(ContentItemVersion(0, id, startMillis, description, rating, started, ended, streamLink, vodLink, imageLink))
    else
      None

  def withUpdatedItem(item: ContentItem) =
    this.copy(
      id = item.id,
      name = item.name
    )

  def withNewVersion(version: ContentItemVersion) =
    this.copy(
      startMillis = version.startMillis,
      description = version.description,
      rating = version.rating,
      started = version.started,
      ended = version.ended,
      streamLink = version.streamLink,
      vodLink = version.vodLink,
      imageLink = version.imageLink
    )
}

object ContentItem extends Updatable[ContentItem, (Int, String, Int), Tables.ContentItems] {
  lazy val table = Tables.contentItems

  def reify(tuple: (Int, String, Int)) =
    (apply _).tupled(tuple)

  def classToTuple(a: ContentItem) =
    unapply(a).get

  def updateQuery(a: ContentItem) = table.filter(_.id === a.id)
    .map(x => (x.name))
    .update((a.name))
}

object OneFullContentItem {

  def db = AppGlobals.db

  def save(item: OneFullContentItem) = {
    val newItem = Await.result(ContentItem.save(item.contentItem), Duration.Inf)
    val updated = item.withUpdatedItem(newItem)
    val version = Await.result(ContentItemVersion.create(updated.contentItemVersion.get), Duration.Inf)
    Await.result(VersionAcceptance.accept(version.id), Duration.Inf)
    updated.withNewVersion(version)
  }

  def getById(id: Int) =
    getByIds(Seq(id)).map(_.head)

  def getByIds(ids: Seq[Int]) = {
    db().run(
      (for {
        items <- ContentItem.table.filter(_.id inSet ids)
        versions <- ContentItemVersion.table if versions.contentItemId === items.id
        acceptances <- VersionAcceptance.table.filter(_.accepted) if acceptances.contentItemVersionId === versions.id
      } yield (items, versions)).result
    ).map(_.map(reifyFromBigTuple))
  }

  def getByGameId(gameId: Int) = {
    db().run(
      (for {
        items <- ContentItem.table.filter(_.gameId === gameId)
        versions <- ContentItemVersion.table if versions.contentItemId === items.id
        acceptances <- VersionAcceptance.table.filter(_.accepted) if acceptances.contentItemVersionId === versions.id
      } yield (items, versions)).result
    ).map(_.map(reifyFromBigTuple))
  }

  def getAll() = {
    db().run(
      (for {
        items <- ContentItem.table
        versions <- ContentItemVersion.table if versions.contentItemId === items.id
        acceptances <- VersionAcceptance.table.filter(_.accepted) if acceptances.contentItemVersionId === versions.id
      } yield (items, versions)).result
    ).map(_.map(reifyFromBigTuple))
  }

  private def reifyFromBigTuple(bigTuple: ((Int, String, Int),(Int, Int, Long, String, Option[Double], Boolean, Boolean, Option[String], Option[String], Option[String], Long))) = {
    val (itemTuple, versionTuple) = bigTuple
    val item = ContentItem.reify(itemTuple)
    val version = ContentItemVersion.reify(versionTuple)
    OneFullContentItem(item.id, item.gameId, item.name, version.startMillis, version.description, version.rating, version.started, version.ended, version.streamLink, version.vodLink, version.imageLink)
  }

}