// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

    var WriteToSymbolProperty = function (SymbolToWrite, PropertyToWrite, ValueToWrite) {
        var ControlName = SymbolToWrite.__symbol.__expression.__expression.replace("%pp%", "").replace("%/pp%", "").split(".")[0];
        var Control = TcHmi.Controls.get(ControlName);
        var Parameter = SymbolToWrite.__symbol.__expression.__expression.replace("%pp%", "").replace("%/pp%", "").split(".")[1];
        var symbolExpression = TcHmi.Binding.resolveEx(Parameter, Control);
        TcHmi.Symbol.writeEx(symbolExpression.toString().replace("%/s%", "") + '::' + PropertyToWrite + '%/s%', ValueToWrite, function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                ;// Handle success... 
            } else {
                ;// Handle error... 
            }
        });
    };
    
    TcHmi.Functions.registerFunction('WriteToSymbolProperty', WriteToSymbolProperty);
})(TcHmi);