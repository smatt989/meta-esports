package com.example.app

//import slick.driver.H2Driver.api._
import java.sql.Timestamp

import slick.driver.PostgresDriver.api._
import slick.profile.SqlProfile.ColumnOption.SqlType


object Tables {

  class Users(tag: Tag) extends Table[(Int, String, String, String)](tag, "USER_ACCOUNTS") with HasIdColumn[Int] {
    def id = column[Int]("USER_ACCOUNT_ID", O.PrimaryKey, O.AutoInc)
    def username = column[String]("USERNAME")
    def email = column[String]("EMAIL")
    def hashedPassword = column[String]("HASHED_PASSWORD")

    def * = (id, username, email, hashedPassword)
  }

  class DeviceTokens(tag: Tag) extends Table[(Int, Int, Option[String])](tag, "DEVICE_TOKENS") with HasIdColumn[Int] {
    def id = column[Int]("DEVICE_TOKEN_ID", O.PrimaryKey, O.AutoInc)
    def userId = column[Int]("USER_ID")
    def deviceToken = column[Option[String]]("DEVICE_TOKEN")

    def * = (id, userId, deviceToken)

    def user = foreignKey("DEVICE_TOKENS_TO_USER_FK", userId, users)(_.id)
  }

  class UserSessions(tag: Tag) extends Table[(Int, Int, String)](tag, "USER_SESSIONS") with HasIdColumn[Int] {
    def id = column[Int]("USER_SESSION_ID", O.PrimaryKey, O.AutoInc)
    def userId = column[Int]("USER_ID")
    def hashString = column[String]("HASH_STRING")

    def * = (id, userId, hashString)

    def user = foreignKey("USER_SESSIONS_TO_USER_FK", userId, users)(_.id)
  }

  class UserConnections(tag: Tag) extends Table[(Int, Int, Int)](tag, "USER_CONNECTIONS") with HasIdColumn[Int] {
    def id = column[Int]("USER_CONNECTION_ID", O.PrimaryKey, O.AutoInc)
    def senderUserId = column[Int]("SENDER_USER_ID")
    def receiverUserId = column[Int]("RECEIVER_USER_ID")

    def * = (id, senderUserId, receiverUserId)

    def sender = foreignKey("USER_CONNECTIONS_SENDER_TO_USERS_FK", senderUserId, users)(_.id)
    def receiver = foreignKey("USER_CONNECTIONS_RECEIVER_TO_USERS_FK", receiverUserId, users)(_.id)
  }

  class Games(tag: Tag) extends Table[(Int, String, Option[String])](tag, "GAMES") with HasIdColumn[Int] {
    def id = column[Int]("GAME_ID", O.PrimaryKey, O.AutoInc)
    def name = column[String]("GAME_NAME")
    def imageLink = column[Option[String]]("IMAGE_LINK")

    def * = (id, name, imageLink)
  }

  class ContentItems(tag: Tag) extends Table[(Int, String, Int)](tag, "CONTENT_ITEMS") with HasIdColumn[Int] {
    def id = column[Int]("CONTENT_ITEM_ID", O.PrimaryKey, O.AutoInc)
    def name = column[String]("CONTENT_ITEM_NAME")
    def gameId = column[Int]("GAME_ID")

    def * = (id, name, gameId)

    def game = foreignKey("CONTENT_ITEMS_TO_GAME_FK", gameId, games)(_.id)
  }

  class ContentItemVersions(tag: Tag) extends Table[(Int, Int, Long, String, Option[Double], Boolean, Boolean, Option[String], Option[String], Option[String], Long)](tag, "CONTENT_ITEM_VERSIONS") with HasIdColumn[Int] {
    def id = column[Int]("CONTENT_ITEM_VERSION_ID", O.PrimaryKey, O.AutoInc)
    def contentItemId = column[Int]("CONTENT_ITEM_ID")
    def startMillis = column[Long]("START_MILLIS")
    def description = column[String]("DESCRIPTION")
    def rating = column[Option[Double]]("RATING")
    def started = column[Boolean]("STARTED")
    def ended = column[Boolean]("FINISHED")
    def streamLink = column[Option[String]]("STREAM_LINK")
    def vodLink = column[Option[String]]("VOD_LINK")
    def imageLink = column[Option[String]]("IMAGE_LINK")
    def createdMillis = column[Long]("CREATED_MILLIS")

    def * = (id, contentItemId, startMillis, description, rating, started, ended, streamLink, vodLink, imageLink, createdMillis)

    def contentItem = foreignKey("CONTENT_ITEM_VERSIONS_TO_CONTENT_ITEM_FK", contentItemId, contentItems)(_.id)
  }

  class VersionAcceptances(tag: Tag) extends Table[(Int, Int, Boolean, Long)](tag, "VERSION_ACCEPTANCES") with HasIdColumn[Int] {
    def id = column[Int]("VERSION_ACCEPTANCE_ID", O.PrimaryKey, O.AutoInc)
    def contentItemVersionId = column[Int]("CONTENT_ITEM_VERSION_ID")
    def accepted = column[Boolean]("ACCEPTED")
    def updatedMillis = column[Long]("UPDATED_MILLIS")

    def * = (id, contentItemVersionId, accepted, updatedMillis)

    def contentItemVersion = foreignKey("VERSION_ACCEPTANCES_TO_CONTENT_ITEM_VERSION_FK", contentItemVersionId, contentItemVersions)(_.id)
  }


  val users = TableQuery[Users]
  val deviceTokens = TableQuery[DeviceTokens]
  val userSessions = TableQuery[UserSessions]

  val userConnections = TableQuery[UserConnections]

  val games = TableQuery[Games]
  val contentItems = TableQuery[ContentItems]
  val contentItemVersions = TableQuery[ContentItemVersions]
  val versionAcceptances = TableQuery[VersionAcceptances]

  val schemas = (users.schema ++ userSessions.schema ++ deviceTokens.schema ++ userConnections.schema ++ games.schema ++ contentItems.schema ++ contentItemVersions.schema ++ versionAcceptances.schema)


  // DBIO Action which creates the schema
  val createSchemaAction = schemas.create

  // DBIO Action which drops the schema
  val dropSchemaAction = schemas.drop

}

trait HasIdColumn[A]{
  def id: Rep[A]
}
