package com.example.app.models

import com.example.app.{HasIntId, Tables, Updatable}
import slick.driver.PostgresDriver.api._
import scala.concurrent.ExecutionContext.Implicits.global

case class Game(id: Int = 0, name: String, imageLink: Option[String] = None) extends HasIntId[Game]{
  def updateId(id: Int) = this.copy(id = id)
}

object Game extends Updatable[Game, (Int, String, Option[String]), Tables.Games]{
  lazy val table = Tables.games

  def reify(tuple: (Int, String, Option[String])) =
    (apply _).tupled(tuple)

  def classToTuple(a: Game) =
    unapply(a).get

  def updateQuery(a: Game) = table.filter(_.id === a.id)
    .map(x => (x.name, x.imageLink))
    .update((a.name, a.imageLink))
}
