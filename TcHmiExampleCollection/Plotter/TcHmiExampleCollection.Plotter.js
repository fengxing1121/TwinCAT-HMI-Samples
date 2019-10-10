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

TcHmiExampleCollection.Plotter = {};
TcHmiExampleCollection.Plotter.checkImplementation = function () { if (TcHmiExampleCollection) { return true } };

if (!TcHmiExampleCollection.Plotter.checkImplementation()) {
    console.log("TcHmiExampleCollection.js needs to be loaded before.");
};



TcHmiExampleCollection.Plotter.Layout = [{
    autosize: true,
    yaxis: {
        overlaying: 'y',
        tickfont: { color: '#ffffff00' },
        titlefont: { color: '#ffffff00' },
        tickfont: { color: '#ffffff00' },
        zerolinecolor: '#ffffff00',
        linecolor: '#ffffff00',
        gridcolor: '#ffffff00',
    }
}]

TcHmiExampleCollection.Plotter.TraceTypes = [{
    x: [],
    y: [],
    type: 'scatter',
    name: '',
    line: {
        dash: 'dashdot',
        width: 4,
        shape: 'hv'
    },
    mode: 'lines',
}];

TcHmiExampleCollection.Plotter.Mode = [{
    responsive: true,
    modeBarButtonsToRemove: ['sendDataToCloud', 'autoScale2d', 'select2d', 'lasso2d', 'toImage'],
    displaylogo: false,
    showTips: true
}]

TcHmiExampleCollection.Plotter.PlotData = [];
TcHmiExampleCollection.Plotter.PlotAreas = [];
TcHmiExampleCollection.Plotter.DataCollection = { x: [], y: [] };

TcHmiExampleCollection.Plotter.initChart = function (layout, modebar, callback) {
    Plotly.newPlot('PlotterArea', TcHmiExampleCollection.Plotter.Layout[layout], TcHmiExampleCollection.Plotter.Mode[0]);
    callback();
}

TcHmiExampleCollection.Plotter.collectData = function () {
    for (let a = 0; a < TcHmiExampleCollection.Plotter.TestData.length; a++) {
        TcHmiExampleCollection.Plotter.DataCollection.x[a] = TcHmiExampleCollection.Plotter.TestData[a].Timestamp;
        TcHmiExampleCollection.Plotter.DataCollection.y[a] = TcHmiExampleCollection.Plotter.TestData[a].Value;
    }
    TcHmiExampleCollection.Plotter.drawData(TcHmiExampleCollection.Plotter.DataCollection, 0, 0, 0);
}

TcHmiExampleCollection.Plotter.drawData = function (Data, traceType, layout, modebar) {
    TcHmiExampleCollection.Plotter.PlotAreas[0] = document.getElementById("PlotterArea");
    TcHmiExampleCollection.Plotter.PlotData[0] = TcHmiExampleCollection.Plotter.TraceTypes[traceType];
    TcHmiExampleCollection.Plotter.PlotData[0].x = Data.x;
    TcHmiExampleCollection.Plotter.PlotData[0].y = Data.y;
    TcHmiExampleCollection.Plotter.PlotData[0].name = TcHmiExampleCollection.Plotter.TestData[0].Name;
    Plotly.newPlot(TcHmiExampleCollection.Plotter.PlotAreas[0], [TcHmiExampleCollection.Plotter.PlotData[0]], TcHmiExampleCollection.Plotter.Layout[layout], TcHmiExampleCollection.Plotter.Mode[modebar]);
}


TcHmiExampleCollection.Plotter.TestData = [
 { "Name": "TK1", "Value": 20.75, "Timestamp": "2019-10-09 08:01", "Unit": "°C" },
 { "Name": "TK1", "Value": 20.85, "Timestamp": "2019-10-10 08:02", "Unit": "°C" },
 { "Name": "TK1", "Value": 20.95, "Timestamp": "2019-10-11 08:03", "Unit": "°C" },
 { "Name": "TK1", "Value": 21.05, "Timestamp": "2019-10-12 08:04", "Unit": "°C" },
 { "Name": "TK1", "Value": 21.15, "Timestamp": "2019-10-13 08:05", "Unit": "°C" },
 { "Name": "TK1", "Value": 21.25, "Timestamp": "2019-10-14 08:06", "Unit": "°C" },
 { "Name": "TK1", "Value": 21.35, "Timestamp": "2019-10-15 08:07", "Unit": "°C" },
 { "Name": "TK1", "Value": 21.45, "Timestamp": "2019-10-16 08:08", "Unit": "°C" },
 { "Name": "TK1", "Value": 21.55, "Timestamp": "2019-10-17 08:09", "Unit": "°C" },
 { "Name": "TK1", "Value": 21.65, "Timestamp": "2019-10-18 08:10", "Unit": "°C" },
 { "Name": "TK1", "Value": 21.75, "Timestamp": "2019-10-19 08:11", "Unit": "°C" },
 { "Name": "TK1", "Value": 21.85, "Timestamp": "2019-10-20 08:12", "Unit": "°C" },
 { "Name": "TK1", "Value": 21.95, "Timestamp": "2019-10-21 08:13", "Unit": "°C" },
 { "Name": "TK1", "Value": 22.05, "Timestamp": "2019-10-22 08:14", "Unit": "°C" },
 { "Name": "TK1", "Value": 22.15, "Timestamp": "2019-10-23 08:15", "Unit": "°C" },
 { "Name": "TK1", "Value": 22.25, "Timestamp": "2019-10-24 08:16", "Unit": "°C" },
 { "Name": "TK1", "Value": 22.35, "Timestamp": "2019-10-25 08:17", "Unit": "°C" },
 { "Name": "TK1", "Value": 22.45, "Timestamp": "2019-10-26 08:18", "Unit": "°C" },
 { "Name": "TK1", "Value": 22.55, "Timestamp": "2019-10-27 08:19", "Unit": "°C" },
 { "Name": "TK1", "Value": 22.65, "Timestamp": "2019-10-28 08:20", "Unit": "°C" },
 { "Name": "TK1", "Value": 22.75, "Timestamp": "2019-10-29 08:21", "Unit": "°C" },
 { "Name": "TK1", "Value": 22.85, "Timestamp": "2019-10-30 08:22", "Unit": "°C" },
 { "Name": "TK1", "Value": 22.95, "Timestamp": "2019-10-31 08:23", "Unit": "°C" },
 { "Name": "TK1", "Value": 23.05, "Timestamp": "2019-11-01 08:24", "Unit": "°C" },
 { "Name": "TK1", "Value": 23.15, "Timestamp": "2019-11-02 08:25", "Unit": "°C" },
 { "Name": "TK1", "Value": 23.25, "Timestamp": "2019-11-03 08:26", "Unit": "°C" },
 { "Name": "TK1", "Value": 23.35, "Timestamp": "2019-11-04 08:27", "Unit": "°C" },
 { "Name": "TK1", "Value": 23.45, "Timestamp": "2019-11-05 08:28", "Unit": "°C" },
 { "Name": "TK1", "Value": 23.55, "Timestamp": "2019-11-06 08:29", "Unit": "°C" },
 { "Name": "TK1", "Value": 23.65, "Timestamp": "2019-11-07 08:30", "Unit": "°C" },
 { "Name": "TK1", "Value": 23.75, "Timestamp": "2019-11-08 08:31", "Unit": "°C" },
 { "Name": "TK1", "Value": 23.85, "Timestamp": "2019-11-09 08:32", "Unit": "°C" },
 { "Name": "TK1", "Value": 23.95, "Timestamp": "2019-11-10 08:33", "Unit": "°C" },
 { "Name": "TK1", "Value": 24.05, "Timestamp": "2019-11-11 08:34", "Unit": "°C" },
 { "Name": "TK1", "Value": 24.15, "Timestamp": "2019-11-12 08:35", "Unit": "°C" },
 { "Name": "TK1", "Value": 24.25, "Timestamp": "2019-11-13 08:36", "Unit": "°C" },
 { "Name": "TK1", "Value": 24.35, "Timestamp": "2019-11-14 08:37", "Unit": "°C" },
 { "Name": "TK1", "Value": 24.45, "Timestamp": "2019-11-15 08:38", "Unit": "°C" },
 { "Name": "TK1", "Value": 24.55, "Timestamp": "2019-11-16 08:39", "Unit": "°C" },
 { "Name": "TK1", "Value": 24.65, "Timestamp": "2019-11-17 08:40", "Unit": "°C" },
 { "Name": "TK1", "Value": 24.75, "Timestamp": "2019-11-18 08:41", "Unit": "°C" },
 { "Name": "TK1", "Value": 24.85, "Timestamp": "2019-11-19 08:42", "Unit": "°C" },
 { "Name": "TK1", "Value": 24.95, "Timestamp": "2019-11-20 08:43", "Unit": "°C" },
 { "Name": "TK1", "Value": 25.05, "Timestamp": "2019-11-21 08:44", "Unit": "°C" },
 { "Name": "TK1", "Value": 25.15, "Timestamp": "2019-11-22 08:45", "Unit": "°C" },
 { "Name": "TK1", "Value": 25.25, "Timestamp": "2019-11-23 08:46", "Unit": "°C" },
 { "Name": "TK1", "Value": 25.35, "Timestamp": "2019-11-24 08:47", "Unit": "°C" },
 { "Name": "TK1", "Value": 25.45, "Timestamp": "2019-11-25 08:48", "Unit": "°C" },
 { "Name": "TK1", "Value": 25.55, "Timestamp": "2019-11-26 08:49", "Unit": "°C" },
 { "Name": "TK1", "Value": 25.65, "Timestamp": "2019-11-27 08:50", "Unit": "°C" },
 { "Name": "TK1", "Value": 25.75, "Timestamp": "2019-11-28 08:51", "Unit": "°C" },
 { "Name": "TK1", "Value": 25.85, "Timestamp": "2019-11-29 08:52", "Unit": "°C" },
 { "Name": "TK1", "Value": 25.95, "Timestamp": "2019-11-30 08:53", "Unit": "°C" },
 { "Name": "TK1", "Value": 26.05, "Timestamp": "2019-12-01 08:54", "Unit": "°C" },
 { "Name": "TK1", "Value": 26.15, "Timestamp": "2019-12-02 08:55", "Unit": "°C" },
 { "Name": "TK1", "Value": 26.25, "Timestamp": "2019-12-03 08:56", "Unit": "°C" },
 { "Name": "TK1", "Value": 26.35, "Timestamp": "2019-12-04 08:57", "Unit": "°C" },
 { "Name": "TK1", "Value": 26.45, "Timestamp": "2019-12-05 08:58", "Unit": "°C" },
 { "Name": "TK1", "Value": 26.55, "Timestamp": "2019-12-06 08:59", "Unit": "°C" },
 { "Name": "TK1", "Value": 26.65, "Timestamp": "2019-12-07 09:00", "Unit": "°C" },
 { "Name": "TK1", "Value": 26.75, "Timestamp": "2019-12-08 09:01", "Unit": "°C" },
 { "Name": "TK1", "Value": 26.85, "Timestamp": "2019-12-09 09:02", "Unit": "°C" },
 { "Name": "TK1", "Value": 26.95, "Timestamp": "2019-12-10 09:03", "Unit": "°C" },
 { "Name": "TK1", "Value": 27.05, "Timestamp": "2019-12-11 09:04", "Unit": "°C" },
 { "Name": "TK1", "Value": 27.15, "Timestamp": "2019-12-12 09:05", "Unit": "°C" },
 { "Name": "TK1", "Value": 27.25, "Timestamp": "2019-12-13 09:06", "Unit": "°C" },
 { "Name": "TK1", "Value": 27.35, "Timestamp": "2019-12-14 09:07", "Unit": "°C" },
 { "Name": "TK1", "Value": 27.45, "Timestamp": "2019-12-15 09:08", "Unit": "°C" },
 { "Name": "TK1", "Value": 27.55, "Timestamp": "2019-12-16 09:09", "Unit": "°C" },
 { "Name": "TK1", "Value": 27.65, "Timestamp": "2019-12-17 09:10", "Unit": "°C" },
 { "Name": "TK1", "Value": 27.75, "Timestamp": "2019-12-18 09:11", "Unit": "°C" },
 { "Name": "TK1", "Value": 27.85, "Timestamp": "2019-12-19 09:12", "Unit": "°C" },
 { "Name": "TK1", "Value": 27.95, "Timestamp": "2019-12-20 09:13", "Unit": "°C" },
 { "Name": "TK1", "Value": 28.05, "Timestamp": "2019-12-21 09:14", "Unit": "°C" },
 { "Name": "TK1", "Value": 28.15, "Timestamp": "2019-12-22 09:15", "Unit": "°C" },
 { "Name": "TK1", "Value": 28.25, "Timestamp": "2019-12-23 09:16", "Unit": "°C" },
 { "Name": "TK1", "Value": 28.35, "Timestamp": "2019-12-24 09:17", "Unit": "°C" },
 { "Name": "TK1", "Value": 28.45, "Timestamp": "2019-12-25 09:18", "Unit": "°C" },
 { "Name": "TK1", "Value": 28.55, "Timestamp": "2019-12-26 09:19", "Unit": "°C" },
 { "Name": "TK1", "Value": 28.65, "Timestamp": "2019-12-27 09:20", "Unit": "°C" },
 { "Name": "TK1", "Value": 28.75, "Timestamp": "2019-12-28 09:21", "Unit": "°C" },
 { "Name": "TK1", "Value": 28.85, "Timestamp": "2019-12-29 09:22", "Unit": "°C" },
 { "Name": "TK1", "Value": 28.95, "Timestamp": "2019-12-30 09:23", "Unit": "°C" },
 { "Name": "TK1", "Value": 29.05, "Timestamp": "2019-12-31 09:24", "Unit": "°C" },
 { "Name": "TK1", "Value": 29.15, "Timestamp": "2020-01-01 09:25", "Unit": "°C" },
 { "Name": "TK1", "Value": 29.25, "Timestamp": "2020-01-02 09:26", "Unit": "°C" },
 { "Name": "TK1", "Value": 29.35, "Timestamp": "2020-01-03 09:27", "Unit": "°C" },
 { "Name": "TK1", "Value": 29.45, "Timestamp": "2020-01-04 09:28", "Unit": "°C" },
 { "Name": "TK1", "Value": 29.55, "Timestamp": "2020-01-05 09:29", "Unit": "°C" },
 { "Name": "TK1", "Value": 29.65, "Timestamp": "2020-01-06 09:30", "Unit": "°C" },
 { "Name": "TK1", "Value": 29.75, "Timestamp": "2020-01-07 09:31", "Unit": "°C" },
 { "Name": "TK1", "Value": 29.85, "Timestamp": "2020-01-08 09:32", "Unit": "°C" },
 { "Name": "TK1", "Value": 29.95, "Timestamp": "2020-01-09 09:33", "Unit": "°C" },
 { "Name": "TK1", "Value": 30.05, "Timestamp": "2020-01-10 09:34", "Unit": "°C" },
 { "Name": "TK1", "Value": 30.15, "Timestamp": "2020-01-11 09:35", "Unit": "°C" },
 { "Name": "TK1", "Value": 30.25, "Timestamp": "2020-01-12 09:36", "Unit": "°C" },
 { "Name": "TK1", "Value": 30.35, "Timestamp": "2020-01-13 09:37", "Unit": "°C" },
 { "Name": "TK1", "Value": 30.45, "Timestamp": "2020-01-14 09:38", "Unit": "°C" },
 { "Name": "TK1", "Value": 30.55, "Timestamp": "2020-01-15 09:39", "Unit": "°C" },
 { "Name": "TK1", "Value": 30.65, "Timestamp": "2020-01-16 09:40", "Unit": "°C" }
];
