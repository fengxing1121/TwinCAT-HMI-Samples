// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

    var Animate = function (ctx, ControlElement, Cleanup) {
        /* https://infosys.beckhoff.com/content/1033/te2000_tc3_hmi_engineering/6435832203.html?id=4429431160664893841 */
        var animation = new TcHmi.Animation(ControlElement.getId(), '') // Create the animation
            .fillMode('forwards')   // Set fillMode 
            .addKeyframe('left', ControlElement.getLeft() + ControlElement.getLeftUnit(), 0) // Add first keyframe to current position
            .addKeyframe('left', (ControlElement.getLeft() + 50) + ControlElement.getLeftUnit(), 1) // Add second keyframe to current position +50
            .duration(1000);    // Set duration for 1sec
        animation.cleanup(Cleanup); // Cleanup to set values after animation
        animation.run();    // Runs the animation
        TcHmi.Controls.get(ControlElement.getId()).setLeft(ControlElement.getLeft() + 50);  // Set the real position of element
        };

    TcHmi.Functions.registerFunction('Animate', Animate);
})(TcHmi);