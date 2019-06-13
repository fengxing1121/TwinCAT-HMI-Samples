// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

    var RemoveFromTrendChart = function (SymbolToRemove,TrendChartList,TrendChartYList) {
        if (SymbolToRemove!=null) {
        var XaxisList = TcHmi.Symbol.readEx(TrendChartList.__symbol.__expression.__expression);
        var YaxisList = TcHmi.Symbol.readEx(TrendChartYList.__symbol.__expression.__expression);

        if (JSON.stringify(XaxisList) == "{}") {
            XaxisList = [];
            YaxisList = [];
        }

        for (var a = 0; a < XaxisList.length; a++) {
            if (XaxisList[a].symbol == SymbolToRemove.symbol) {
                XaxisList.splice(a,1);
                break;
            }
        }
        for (var a = 0; a < YaxisList.length; a++) {
            if (YaxisList[a].axisName == SymbolToRemove.symbol) {
                YaxisList.splice(a,1);
                break;
            }
        }

        TcHmi.Symbol.writeEx(TrendChartList.__symbol.__expression.__expression, XaxisList);
        TcHmi.Symbol.writeEx(TrendChartYList.__symbol.__expression.__expression, YaxisList);
        }
    };
    
    TcHmi.Functions.registerFunction('RemoveFromTrendChart', RemoveFromTrendChart);
})(TcHmi);