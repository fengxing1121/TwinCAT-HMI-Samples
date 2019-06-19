// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {
    //Register to the global onInitialized event; the anonymous function will be called only one time and will register the event listener for resolution change
    let destr = TcHmi.EventProvider.register("onInitialized", function () {
        // This event will be raised only once, so it is nice to cleanup
        destr();

        //Add an event listener to a media query for desktop resolution
        if (!TCHMI_ENABLE_DESIGNER_MODE_MASTER) {
            let mqd = window.matchMedia("(min-width: 1024px)");
            mqd.addListener(WidthChange);
            WidthChange(mqd);
        }

        //Add an event listener to a media query for tablet resolution
        if (!TCHMI_ENABLE_DESIGNER_MODE_MASTER) {
            let mqt = window.matchMedia("(max-width: 1024px) and (min-width: 768px)");
            mqt.addListener(WidthChange);
            WidthChange(mqt);
        }

        //Add an event listener to a media query for mobile resolution
        if (!TCHMI_ENABLE_DESIGNER_MODE_MASTER) {
            let mqm = window.matchMedia("(max-width: 768px)");
            mqm.addListener(WidthChange);
            WidthChange(mqm);
        }
    });

    //Callback if a media query result has changed
    let WidthChange = function (mq) {
        //console.log(mq);
        if ((mq.media === "(min-width: 1024px)") && mq.matches) {
            //console.log("Desktop");
            //Window width is over 1024px
            TcHmi.View.load('Desktop.view', function (data) {
                //Optional: Callback after the page is loaded
            });
            return;
        }

        if ((mq.media === "(max-width: 1024px) and (min-width: 768px)") && mq.matches) {
            //console.log("Tablet");
            //Window width is between 768px and 1024px
            TcHmi.View.load('Tablet.view', function (data) {
                //Optional: Callback after the page is loaded
            });
            return;
        }

        if ((mq.media === "(max-width: 768px)") && mq.matches) {
            //console.log("Mobile");
            //Window width is under 768px
            TcHmi.View.load('Mobile.view', function (data) {
                //Optional: Callback after the page is loaded
            });
            return;
        }
    }
})(TcHmi);