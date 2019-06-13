// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

	var AddToTrendChartFromUC = function (TrendChartList,TrendChartYList) {

        var id = event.currentTarget.id.split(".")[0]; 
        var target = EventTarget;
        var eventTarget = eventTarget;

        //getting the usercontrol itself
        var _ctrl = TcHmi.Controls.get(id);

        //getting linked parameter symbolnames
        var _instance = _ctrl.__pcElement[0].dataset.tchmiHistorysymbol;

        //cleaning up the tag
        var VariableToAdd = _instance.replace("%s%", "").replace("%/s%", "");

        if (VariableToAdd != null) {
            var XaxisList = TcHmi.Symbol.readEx(TrendChartList.__symbol.__expression.__expression);
            var YaxisList = TcHmi.Symbol.readEx(TrendChartYList.__symbol.__expression.__expression);

            if (JSON.stringify(XaxisList) == "{}") {
                XaxisList = [];
                YaxisList = [];
            }


            var r = Math.floor(Math.random() * 128 + 64);          // Random between 64-192
            var g = Math.floor(Math.random() * 128 + 64);          // Random between 64-192
            var b = Math.floor(Math.random() * 128 + 64);          // Random between 64-192
            var a = 255;
            var rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'; // Collect all to a string

            var XaxisTemplate = {
                symbol: VariableToAdd,
                yAxisId: XaxisList.length,
                lineWidth: 2,
                lineColor: { "color": rgba },
                pointDot: true,
                pointDotInStopMode: true,
                pointDotRadius: 2,
                pointDotFillColor: { "color": rgba },
                pointDotStrokeWidth: 2,
                pointDotStrokeColor: { "color": rgba },
            };

            XaxisList[XaxisList.length] = XaxisTemplate;

            //TcHmi.Symbol.writeEx('%i%trendChartParameters%/i%', XaxisList);


            var YaxisTemplate = {
                id: YaxisList.length,
                position: "Left",
                mainTickMinValue: 0,
                mainTickMaxValue: 100,
                showLabels: true,
                labelFontColor: { "color": rgba },
                axisColor: { "color": rgba },
                showAxisName: true,
                axisName: VariableToAdd,
                axisNameFontColor: { "color": rgba },
                autoScaling: true,
                axisNameFontFamily: null,
                axisNameFontSize: 15,
                axisNameFontSizeUnit: "px",
                axisNameFontWeight: "Bold",
                decimalPlaces: 2
            };

            YaxisList[YaxisList.length] = YaxisTemplate;


            TcHmi.Symbol.writeEx(TrendChartList.__symbol.__expression.__expression, XaxisList);
            TcHmi.Symbol.writeEx(TrendChartYList.__symbol.__expression.__expression, YaxisList);
        }
    };
    
	TcHmi.Functions.registerFunction('AddToTrendChartFromUC', AddToTrendChartFromUC);
})(TcHmi);