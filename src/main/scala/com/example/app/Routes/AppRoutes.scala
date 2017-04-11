package com.example.app.Routes

import com.example.app.{AuthenticationSupport, SlickRoutes}
import com.example.app.models._
import org.json4s.JsonAST.JObject

trait AppRoutes extends SlickRoutes with AuthenticationSupport{


  get("/") {
      <html>
        <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.2/dist/leaflet.css" />
            <link rel="stylesheet" href="/front-end/dist/app.css" />
          </head>
          <body>
            <div id="app"></div>
            <script src="/front-end/dist/bundle.js"></script>
          </body>
        </html>
  }

  get("/games"){
    contentType = formats("json")

    Game.getAll
  }

  post("/games/save") {
    contentType = formats("json")
    authenticate()

    val game = parsedBody.extract[Game]

    Game.save(game)
  }

  post("/games/content/save"){
    contentType = formats("json")
    authenticate()

    val item = parsedBody.extract[OneFullContentItem]

    OneFullContentItem.save(item)
  }

  post("/games/content/:id/remove") {
    contentType = formats("json")
    authenticate()

    val contentItemId = {params("id")}.toInt

    VersionAcceptance.demoteVersions(contentItemId)
  }

  get("/games/content/all") {
    contentType = formats("json")

    OneFullContentItem.getAll()
  }

}
