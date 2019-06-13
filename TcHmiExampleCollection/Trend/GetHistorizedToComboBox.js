// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

    var GetHistorizedToComboBox = function (HistorizedSymbols) {
        var SelectableValues = [];
        var a = 0;
        for (var property in HistorizedSymbols) {
            SelectableValues[a] = {};
            SelectableValues[a].id = a;
            SelectableValues[a].value = property;
            SelectableValues[a].text = property;
            a++;
        }
        return SelectableValues;
    };
    
    TcHmi.Functions.registerFunction('GetHistorizedToComboBox', GetHistorizedToComboBox);
})(TcHmi);