AFRAME.registerComponent("clock", {
  schema: {
    timeZones: { type: 'array', default: ['Los Angeles', 'Vietnam', 'London', 'Tokyo'] }
  },
  
  init: function () {
    const self = this;
    
   
    this.titleEl = document.createElement("a-text");
    this.titleEl.setAttribute("position", { x: 0, y: 1.5, z: 0 });
    this.titleEl.setAttribute("color", "#00ff00");
    this.titleEl.setAttribute("font", "sourcecodepro");
    this.titleEl.setAttribute("value", "Time Zone Converter");
    this.titleEl.setAttribute("align", "center");
    this.titleEl.setAttribute("width", 4);
    this.el.appendChild(this.titleEl);
    
    this.localTimeEl = document.createElement("a-text");
    this.localTimeEl.setAttribute("position", { x: 0, y: 1, z: 0 });
    this.localTimeEl.setAttribute("color", "#ffffff");
    this.localTimeEl.setAttribute("font", "sourcecodepro");
    this.localTimeEl.setAttribute("value", "Current local time: Loading...");
    this.localTimeEl.setAttribute("align", "center");
    this.localTimeEl.setAttribute("width", 4);
    this.el.appendChild(this.localTimeEl);
    
    this.convertedTimeEl = document.createElement("a-text");
    this.convertedTimeEl.setAttribute("position", { x: 0, y: 0.5, z: 0 });
    this.convertedTimeEl.setAttribute("color", "#ffff00");
    this.convertedTimeEl.setAttribute("font", "sourcecodepro");
    this.convertedTimeEl.setAttribute("value", "Select a time zone to convert");
    this.convertedTimeEl.setAttribute("align", "center");
    this.convertedTimeEl.setAttribute("width", 4);
    this.el.appendChild(this.convertedTimeEl);
    

    this.createTimeZoneButtons();
    this.updateLocalTime();
    
    this.timeInterval = setInterval(() => {
      this.updateLocalTime();
    }, 1000);
  },
  
  createTimeZoneButtons: function() {
    const timeZones = this.data.timeZones;
    const buttonWidth = 1.2;
    const spacing = 1.5;
    const startX = -((timeZones.length - 1) * spacing) / 2;
    
    for (let i = 0; i < timeZones.length; i++) {
      const xPos = startX + (i * spacing);
      const timeZone = timeZones[i];
      
      const buttonEl = document.createElement("a-entity");
      buttonEl.setAttribute("position", { x: xPos, y: -0.5, z: 0 });
      
      const buttonBg = document.createElement("a-box");
      buttonBg.setAttribute("width", buttonWidth);
      buttonBg.setAttribute("height", 0.4);
      buttonBg.setAttribute("depth", 0.1);
      buttonBg.setAttribute("color", "#4285f4");
      buttonBg.setAttribute("class", "clickable");
      buttonBg.setAttribute("data-timezone", timeZone);
      buttonEl.appendChild(buttonBg);
      
      const buttonText = document.createElement("a-text");
      buttonText.setAttribute("value", timeZone);
      buttonText.setAttribute("position", { x: 0, y: 0, z: 0.06 });
      buttonText.setAttribute("color", "#ffffff");
      buttonText.setAttribute("align", "center");
      buttonText.setAttribute("width", buttonWidth * 1.5);
      buttonEl.appendChild(buttonText);
      
      buttonBg.addEventListener("click", (e) => {
        const selectedZone = e.target.getAttribute("data-timezone");
        this.convertToTimeZone(selectedZone);
      });
      
      this.el.appendChild(buttonEl);
    }
  },
  
  updateLocalTime: function() {
    const now = spacetime.now();
    this.localTimeEl.setAttribute("value", "Current local time: " + displayTime(now));
  },
  
  convertToTimeZone: function(timeZoneString) {
    const now = spacetime.now();
    const convertedTime = convertTimeZone(now, timeZoneString);
    
    if (convertedTime) {
      this.convertedTimeEl.setAttribute("value", 
        "Current time in " + timeZoneString + ": " + displayTime(convertedTime));
    } else {
      this.convertedTimeEl.setAttribute("value", 
        "Could not convert to " + timeZoneString);
    }
  },
  
  tick: function() {
  },
  
  remove: function() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }
});