// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {
    // If you want to unregister an event outside the event code you need to use the return value of the method register()
    var destroyOnInitialized = TcHmi.EventProvider.register('onInitialized', function (e, data) {
        // This event will be raised only once, so we can free resources. 
        // It's best practice to use destroy function of the event object within the callback function to avoid conflicts.
        e.destroy();
        // ----------------------
        // Place your code here!
        // ----------------------
    });
})(TcHmi);

TcHmiExampleCollection.Trendline = {};
TcHmiExampleCollection.Trendline.DebugMode = true;
TcHmiExampleCollection.Trendline.XAxisList = [];
TcHmiExampleCollection.Trendline.getXList = function () { return TcHmiExampleCollection.Trendline.XAxisList }
TcHmiExampleCollection.Trendline.YAxisList = [];
TcHmiExampleCollection.Trendline.getYList = function () { return TcHmiExampleCollection.Trendline.YAxisList }

TcHmiExampleCollection.Trendline.checkImplementation = function () { return (TcHmiExampleCollection && TcHmiExampleCollection.Trendline)};
TcHmiExampleCollection.Trendline.checkVariale = function (variable) { return variable != null};
TcHmiExampleCollection.Trendline.generateColor = function () {
    var r = Math.floor(Math.random() * 128 + 64);          // Random between 64-192
    var g = Math.floor(Math.random() * 128 + 64);          // Random between 64-192
    var b = Math.floor(Math.random() * 128 + 64);          // Random between 64-192
    var a = 255;
    var rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'; // Collect all to a string
    return rgba;
}
TcHmiExampleCollection.Trendline.XAxisTemplate = {
    symbol: "",
    yAxisId: 0,
    lineWidth: 2,
    lineColor: "",
    pointDot: true,
    pointDotInStopMode: true,
    pointDotRadius: 2,
    pointDotFillColor: "",
    pointDotStrokeWidth: 2,
    pointDotStrokeColor: "",
};
TcHmiExampleCollection.Trendline.YAxisTemplate = { "id": 0, "position": "Left", "mainTickMinValue": 0, "mainTickMaxValue": 100, "showLabels": true, "showAxisName": true, "axisName": "y-axis", "axisNameFontFamily": null, "axisNameFontSize": 15, "axisNameFontSizeUnit": "px", "axisNameFontWeight": "Bold", "decimalPlaces": 2, "unit": "", "autoScaling": false, "labelFontColor": { "color": "rgba(71, 148, 218, 1)" }, "axisColor": { "color": "rgba(71, 148, 218, 1)" }, "axisNameFontColor": { "color": "rgba(71, 148, 218, 1)" } }
;
TcHmiExampleCollection.Trendline.refresh = function () {
    TcHmi.Symbol.writeEx('%ctrl%TrendlineSelectedSymbols::SrcData%/ctrl%', TcHmiExampleCollection.Trendline.XAxisList, function (data) {
        if (TcHmiExampleCollection.Trendline.DebugMode) { console.log(data) }
    });
    TcHmi.Symbol.writeEx('%ctrl%TcHmiTrendLineChart::LineGraphDescription%/ctrl%', TcHmiExampleCollection.Trendline.XAxisList, function (data) {
        if (TcHmiExampleCollection.Trendline.DebugMode) { console.log(data) }
    });
    TcHmi.Symbol.writeEx('%ctrl%TcHmiTrendLineChart::YAxis%/ctrl%', TcHmiExampleCollection.Trendline.YAxisList, function (data) {
        if (TcHmiExampleCollection.Trendline.DebugMode) { console.log(data) }
    });
};