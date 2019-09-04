// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

    var ResolveSymbol = function (ControlFromToResolve,ParameterToResolve) {

        //var Control = TcHmi.Controls.get(ControlFromToResolve);
        if (Control) {
            var symbolExpression = TcHmi.Binding.resolveEx(ParameterToResolve, ControlFromToResolve);
            if (symbolExpression) {
                // Binding exists
                return symbolExpression.toString();
            } else {
                // Binding exists not
            }
        }
    };
    
    TcHmi.Functions.registerFunction('ResolveSymbol', ResolveSymbol);
})(TcHmi);