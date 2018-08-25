import { Component, OnInit } from '@angular/core';
import { Request, Http, RequestMethod } from '@angular/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cesium-IP-Viewer';
  private url = "http://localhost:3000";
  constructor(private http: Http) { }
  ngOnInit() {
    const viewer = new Cesium.Viewer('cesiumContainer', {

      imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url: '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
      })
    });
    const pointCollection = viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection());

    this.http.request(new Request({ method: RequestMethod.Get, url: this.url })).subscribe((body) => {
      body.json().forEach(group => {
        pointCollection.add({
          position: new Cesium.Cartesian3.fromDegrees(group.lon, group.lat),
          color: new Cesium.Color(Math.random(), Math.random(), Math.random()),
          pixelSize: 2,
          scaleByDistance: new Cesium.NearFarScalar(0, 5, 3.5e7, 1)
        });
      });
    });
  }
}
