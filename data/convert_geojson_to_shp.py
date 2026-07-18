"""
Gyeongsangbuk-do Municipalities GIS GeoJSON to SHP Converter Script
Run this script with geopandas to generate .shp, .shx, .dbf, .prj files!
"""

import os

def main():
    try:
        import geopandas as gpd
        geojson_path = os.path.join(os.path.dirname(__file__), "gyeongbuk_municipalities.geojson")
        shp_output = os.path.join(os.path.dirname(__file__), "gyeongbuk_municipalities.shp")

        gdf = gpd.read_file(geojson_path)
        gdf.to_file(shp_output, driver="ESRI Shapefile", encoding="utf-8")
        print(f"Successfully converted GeoJSON to ESRI Shapefile: {shp_output}")
    except ImportError:
        print("geopandas is not installed. You can open 'gyeongbuk_municipalities.geojson' directly in QGIS or ArcGIS and save as ESRI Shapefile (.shp)!")

if __name__ == "__main__":
    main()
