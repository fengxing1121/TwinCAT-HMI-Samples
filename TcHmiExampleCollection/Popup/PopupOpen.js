// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

    var PopupOpen = function (Content,Header,HorizontalAlignment,VerticalAlignment,HorizontalDistance,VerticalDistance,Height,Width,WhereToInsert,AddWhereclicked) {
        if (TcHmi.Controls.get(String('PopupInstance'+Content)) || Content == null) {
            return;
        }
        var PopupUuid = String("Popup_" + TcHmiExampleCollection.Utilities.generateUuidv4());
        var PopParameterStartIndex;
        var popupParameters = [];
        var PopParameters = [];
        var popup;
        var popupType = Content.split(".");
        popupType = popupType[popupType.length - 1].toLowerCase();

        if (popupType == "usercontrol") {
            for (var i = 0; i < this.__fnDescr.function.arguments.length; i++) {
                if (this.__fnDescr.function.arguments[i].name == "PopParameters") {
                    PopParameterStartIndex = i;
                    break;
                }
            }
            for (var a = PopParameterStartIndex; a < this.__f.fnParams.length; a++) {
                PopParameters[PopParameters.length] = this.__f.fnParams[a];
            }
            for (var b = 0; b < PopParameters.length; b++) {
                if (PopParameters[b].symbolExpression.search("%pp%") > -1) {
                    var originControl = TcHmi.Controls.get(PopParameters[b].symbolExpression.replace("%pp%", "").replace("%/pp%", "").split(".")[0]);
                    if (originControl) {
                        var symbolExpression = TcHmi.Binding.resolveEx('Parameters', originControl);
                        if (symbolExpression) {
                            if (symbolExpression.toString().toLowerCase().search("parameters")>-1) {
                                popupParameters['data-tchmi-parameters'] = symbolExpression.toString();
                            }
                            if (symbolExpression.toString().toLowerCase().search("value")>-1) {
                                popupParameters['data-tchmi-value'] = symbolExpression.toString();
                            }
                        } else {
                            // Binding exists not
                        }
                        var symbolExpression = TcHmi.Binding.resolveEx('Value', originControl);
                        if (symbolExpression) {
                            if (symbolExpression.toString().toLowerCase().search("parameters") > -1) {
                                popupParameters['data-tchmi-parameters'] = symbolExpression.toString();
                            }
                            if (symbolExpression.toString().toLowerCase().search("value") > -1) {
                                popupParameters['data-tchmi-value'] = symbolExpression.toString();
                            }
                        } else {
                            // Binding exists not
                        }
                    }
                }
            }
        }

        if (Content == undefined) { Content = "" }
        if (HorizontalAlignment == undefined) { HorizontalAlignment = "Top" }
        if (VerticalAlignment == undefined) { VerticalAlignment = "Left" }
        if (HorizontalDistance == undefined) { HorizontalDistance = 0 }
        if (VerticalDistance == undefined) { VerticalDistance = 0 }
        if (Height == undefined) { Height = 100 }
        if (Width == undefined) { Width = 100 }
        if (WhereToInsert == undefined) { WhereToInsert = "Desktop" }

        if (HorizontalAlignment == 'Left') {
            popupParameters['data-tchmi-left'] = HorizontalDistance;
        }
        else if (HorizontalAlignment == 'Center') {
            TcHmi.Log.warn('Please use left/right');
        }
        else if (HorizontalAlignment == 'Right') {
            popupParameters['data-tchmi-right'] = HorizontalDistance;
        }
        
        if (VerticalAlignment == 'Top') {
            popupParameters['data-tchmi-top'] = VerticalDistance;
        }
        if (VerticalAlignment == 'Middle') {
            TcHmi.Log.warn('Please use left/right');
        }
        if (VerticalAlignment == 'Bottom') {
            popupParameters['data-tchmi-bottom'] = VerticalDistance;
        }

        if (AddWhereclicked == true) {
            popupParameters['data-tchmi-left'] = TcHmiExampleCollection.Utilities.ClickPressCoordinates.x;
            popupParameters['data-tchmi-top'] = TcHmiExampleCollection.Utilities.ClickPressCoordinates.y;

        }
        popupParameters['data-tchmi-height'] = Height;
        popupParameters['data-tchmi-width'] = Width;
        popupParameters['data-tchmi-zindex'] = "1000";
        popupParameters['data-tchmi-header'] = Header;

        var documentSizeX = document.body.clientWidth;
        var documentSizeY = document.body.clientHeight;

        //if (TcHmi.Controls.get('ManualControlPopupInstance') != null) {
        //    TcHmi.Controls.get('ManualControlPopupInstance').destroy();
        //}

        if (popupType == "usercontrol") {
            popupParameters['data-tchmi-target-user-control'] = Content;
            popup = TcHmi.ControlFactory.createEx(
            'tchmi-user-control-host',
            PopupUuid,
            popupParameters
            );
        }
        else if (popupType == "content") {
            popupParameters['data-tchmi-target-content'] = Content;
            popup = TcHmi.ControlFactory.createEx(
            'tchmi-region',
            PopupUuid,
            popupParameters
            );
        }
        
        

        var desktop = TcHmi.Controls.get(WhereToInsert.__id);

        if (desktop && popup ) {
            desktop.addChild(popup);
            TcHmiExampleCollection.Utilities.dragElement(document.getElementById(PopupUuid));
        }
        return;
    };
    
    TcHmi.Functions.registerFunction('PopupOpen', PopupOpen);
})(TcHmi);