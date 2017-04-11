package com.example.app.models

import com.example.app.{HasIntId, SlickDbObject, Tables}
import org.joda.time.DateTime

case class ContentItemVersion(
  id: Int,
  contentItemId: Int,
  startMillis: Long,
  description: String,
  rating: Option[Double],
  started: Boolean,
  ended: Boolean,
  streamLink: Option[String],
  vodLink: Option[String],
  imageLink: Option[String],
  createdMillis: Long = new DateTime().getMillis
) extends HasIntId[ContentItemVersion]{
  def updateId(id: Int) = this.copy(id = id)
}

object ContentItemVersion extends SlickDbObject[ContentItemVersion, (Int, Int, Long, String, Option[Double], Boolean, Boolean, Option[String], Option[String], Option[String], Long), Tables.ContentItemVersions] {
  lazy val table = Tables.contentItemVersions

  def reify(tuple: (Int, Int, Long, String, Option[Double], Boolean, Boolean, Option[String], Option[String], Option[String], Long)) =
    (apply _).tupled(tuple)

  def classToTuple(a: ContentItemVersion) =
    unapply(a).get
}