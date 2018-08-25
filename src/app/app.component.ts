import { Component, OnInit } from '@angular/core';
import { Request, Http, RequestMethod } from '@angular/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cesium-IP-Viewer';
  constructor(private http: Http) { }
  ngOnInit() {
    const viewer = new Cesium.Viewer('cesiumContainer', {

      imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url: '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
      })
    });
    const pointCollection = viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection());
    // console.log('here');
    this.http.request(new Request({ method: RequestMethod.Get, url: "http://192.168.0.29:3000" })).subscribe((body) => {
      //   console.log(body.json());
      body.json().forEach(group => {
        //  console.log(group.lon, group.lat);
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
