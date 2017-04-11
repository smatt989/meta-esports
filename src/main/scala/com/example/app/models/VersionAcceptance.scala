package com.example.app.models

import com.example.app.{HasIntId, SlickDbObject, Tables, Updatable}
import org.joda.time.DateTime

import scala.concurrent.Await
import scala.concurrent.duration.Duration
import slick.driver.PostgresDriver.api._

import scala.concurrent.ExecutionContext.Implicits.global


case class VersionAcceptance(id: Int, contentItemVersionId: Int, accepted: Boolean, updatedMillis: Long) extends HasIntId[VersionAcceptance] {
  def updateId(id: Int) = this.copy(id = id)
}

object VersionAcceptance extends Updatable[VersionAcceptance, (Int, Int, Boolean, Long), Tables.VersionAcceptances] {
  lazy val table = Tables.versionAcceptances

  def reify(tuple: (Int, Int, Boolean, Long)) =
    (apply _).tupled(tuple)

  def classToTuple(a: VersionAcceptance) =
    unapply(a).get

  def updateQuery(a: VersionAcceptance) = table.filter(_.id === a.id)
    .map(x => (x.accepted, x.updatedMillis))
    .update((a.accepted, a.updatedMillis))

  def accept(versionId: Int) = {
    val contentVersion = Await.result(ContentItemVersion.byId(versionId), Duration.Inf)
    demoteVersions(contentVersion.contentItemId)
    create(VersionAcceptance(0, versionId, true, new DateTime().getMillis))
  }

  def demoteVersions(contentItemId: Int) ={
    val otherAcceptances = Await.result(db.run(
      (for {
        versions <- ContentItemVersion.table.filter(_.contentItemId === contentItemId)
        acceptances <- table.filter(_.accepted) if versions.id === acceptances.contentItemVersionId
      } yield (acceptances)

        ).result

    ).map(_.map(reify)), Duration.Inf)
    val now = new DateTime().getMillis
    Await.result(updateMany(otherAcceptances.map(_.copy(accepted = false, updatedMillis = now))), Duration.Inf)
  }
}