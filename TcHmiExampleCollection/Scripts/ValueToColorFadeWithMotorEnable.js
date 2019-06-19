// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

    var ValueToColorFadeWithMotorEnable = function (Value, StartColor, EndColor, StartValueScale, EndValueScale, ActuatorType) {
        if (ActuatorType == 2) {
            ValueToColorFade = TcHmi.Functions.getFunction("ValueToColorFade");
            return ValueToColorFade(Value, StartColor, EndColor, StartValueScale, EndValueScale);
        }
    };
    
    TcHmi.Functions.registerFunction('ValueToColorFadeWithMotorEnable', ValueToColorFadeWithMotorEnable);
})(TcHmi);