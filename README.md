# TwinCAT HMI Samples
My collection of TwinCAT HMI Sample material. I try to stash here the most asked and most useful scripts and parts of project for everyones use.
Everything here is "use at your own risk" type of code. I take no responsibility if it makes or brakes something.

## Contents

### Keyboard
- Layout file: Keyboard/Keyboard.content is the keyboard that becomes visible
- Script file: Scripts/TcHmiExampleCollection.Utilities.AutoKeyboard.js 
  - AutoHideOnEnter Whether to hide keyboard on enter press
  - AutoOpenOnInput Whether to open when input field is selected
  - AutoSelectInputContent Whether to select all text in input field on selection
  
### Devices
Selection of different kind of (process) device templates

#### Actuator
- Actuator.usercontrol : Simple actuator template with icon, value and parameter popup
  - Configurable device type. Custom actions for valve and motor/fan 
- ActuatorPopup.usercontrol : Simple actuator popup template with parameters

### Popup
- PopupOpen.js : Framework Function to open popups
  - Issue: Does not show yet the device name.
- PopupCloseThis.js : Framework Function to close popups

### Trend
- Trendline.content : Layout file for trend
- AddToTrendChart.js : Framework Function to add symbols to trendline
- AddToTrendChartFromUC.js : Framework Function to check itself which symbol to add to trendline 
- GetHistorizedToComboBox.js : Framework Function to collect historized symbols to a combobox
- RemoveFromTrendChart.js : Framework Function to remove symbol from trendline
- TcHmiExampleCollection.Trendline.js : Templates, holders and internal use scripts for trendline functionality
- RequestHistorizedDataOfSymbol.js : Framework function to request data from Historizer Extension

### Plotter
- Plotter.content : How to use third party library for plotting data in HMI (Plotly)
- TcHmiExampleCollection.Plotter.js : Functions to use with plotter

### External 3D Library
- Example_External3dLib.content : How to include Three.js and WebGL

### PLC Array Management
- Example_PlcArrayManagement.content : How to get it on with PLC arrays and usercontrols

### Scripts
General collection of some generic but sometimes useful stuff
- Animate.js : Do predefined animations (Really WIP) 
- BooleanToVisibility.js : Returns visibility from boolean
- CheckResolution.js : Check window size and change View accordingly
- DecimalFormatter.js : Framework Function to format decimals of numbers
- DegreesToRotation.js : Generates rotating translation for a element from degree value input
  - DegreesToRotationWithValveEnable.js : Special use of this for Actuator.usercontrol
- DisableContextMenu.js : Disable (right click) context menu in a published project
- GetLoggedSystemEvents.js : Requests system events and exports them in downloadable CSV
- GetSymbolFromArrayIndex.js : Returns a symbol of a array symbols index
- OpenLinkInNewTab.js : Opens a new tab with URL parameter
- ReadUrlParameter.js : Read GET-parameters from URL for e.g. changing View
- ResolveSymbol.js : Returns the symbol that is bind to a controls parameter
- TcHmiExampleCollection.Utilities.js : 
  - dragElement : Make element draggable
  - String prototypes : Useful string functions
  - switchView : Swicht view
  - getClickPressCoordinates : Get coordinates where user clicked
  - generateUuidv4 : Generate Uuids
  - TwoPointScaling : Calculate scaling for value between yMin, yMax, xMin, xMax
  - downloadCSV : CSV handling with arrays
- ValueToColorFade.js : Generate fading color from value and color endpoints
  - ValueToColorFadeWithMotorEnable.js : Special use of this for Actuator.usercontrol
- WriteToSymbolProperty.js : Framework Function to write value to (struct) symbols property
