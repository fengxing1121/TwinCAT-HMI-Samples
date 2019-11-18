// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

    var CreateTrendLineChartLineGraphDescriptionDefinitionList = function (TrendSymbol) {
        if (TrendSymbol != null) {
            returnableValue = [
                {
                    "yAxisId": 1,
                    "lineWidth": 1,
                    "pointDot": false,
                    "pointDotRadius": 3,
                    "pointDotStrokeWidth": 1,
                    "lineColor": {
                        "color": "rgba(71, 148, 218, 1)"
                    },
                    "pointDotFillColor": {
                        "color": "rgba(71, 148, 218, 1)"
                    },
                    "pointDotStrokeColor": {
                        "color": "rgba(71, 148, 218, 1)"
                    },
                    "pointDotInStopMode": true,
                    "symbol": TrendSymbol.__symbol.__expression.__content
                }
            ];
            return returnableValue;
        }
    };
    
    TcHmi.Functions.registerFunction('CreateTrendLineChartLineGraphDescriptionDefinitionList', CreateTrendLineChartLineGraphDescriptionDefinitionList);
})(TcHmi);