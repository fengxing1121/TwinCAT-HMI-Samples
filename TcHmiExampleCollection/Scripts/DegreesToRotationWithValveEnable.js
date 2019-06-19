// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

    var DegreesToRotationWithValveEnable = function (Degrees,ValveEnable) {
        if (ValveEnable==1) {
            return [{
              "transformType": "Rotate",
              "angle": Degrees,
              "angleUnit": "deg"
            }]
        }
        else {
            return [{
                "transformType": "Rotate",
                "angle": 0,
                "angleUnit": "deg"
            }]
        }
    };
    
    TcHmi.Functions.registerFunction('DegreesToRotationWithValveEnable', DegreesToRotationWithValveEnable);
})(TcHmi);