import React, { Component } from "react";

import styles from "./App.module.scss";
import ConfigurationPanel from "./ConfigurationPanel";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: "black",
      squareIt: false,
    };

    this.onImageSelect = this.onImageSelect.bind(this);
    this.createImage = this.createImage.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
    this.onBackgroundColorChange = this.onBackgroundColorChange.bind(this);
    this.paintImage = this.paintImage.bind(this);
  }

  componentDidMount() {
    this.canvas = document.getElementById("canvas");
    // noinspection JSSuspiciousNameCombination
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.ctx = this.canvas.getContext("2d");
  }

  onImageSelect(event) {
    if (typeof window.FileReader !== "function") {
      console.error("The file API isn't supported on this browser yet.");
      return;
    }

    const input = event.target;
    if (!input) {
      console.error("Um, couldn't find the imgfile element.");
    } else if (!input.files) {
      console.error(
        "This browser doesn't seem to support the `files` property of file inputs."
      );
    } else if (!input.files[0]) {
      console.error("Please select a file before clicking 'Load'");
    } else {
      const file = input.files[0];
      this.fr = new FileReader();
      this.fr.onload = this.createImage;
      this.fr.readAsDataURL(file);
    }
  }

  createImage() {
    this.img = new Image();
    this.img.onload = this.onImageLoad;
    this.img.src = this.fr.result;
  }

  onImageLoad() {
    if (!this.img) {
      console.warn("No image");
      return;
    }

    if (this.state.squareIt) {
      const side = Math.max(this.img.width, this.img.height);
      this.canvas.width = side;
      this.canvas.height = side;
    } else {
      this.canvas.width = this.img.width;
      this.canvas.height = this.img.height;
    }

    this.paintImage();
    // ctx.drawImage(img, img.width / 4, img.height / 4, img.width / 2, img.height / 2, 0, 0, canvas.width, canvas.height);
  }

  paintImage(backgroundColor = this.state.backgroundColor) {
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fill();
    this.ctx.drawImage(
      this.img,
      this.canvas.width / 2 - this.img.width / 2,
      this.canvas.height / 2 - this.img.height / 2
    );
    this.setState({ previewSrc: this.canvas.toDataURL("image/png") });
  }

  onBackgroundColorChange(color) {
    this.setState(
      { backgroundColor: color },
      () => this.img && this.paintImage(color)
    );
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <a href="/" className={styles.logoWrapper}>
            <img
              className={styles.logo}
              src="/android-chrome-192x192.png"
              alt=""
            />
            <span className={styles.headerTitle}>Meme Maker</span>
          </a>
        </header>

        <div className={styles.main}>
          <canvas id="canvas" />

          <div className={styles.previewWrapper}>
            <img
              id="preview"
              className={styles.preview}
              src={this.state.previewSrc}
              alt=""
            />
          </div>

          <ConfigurationPanel
            squareIt={this.state.squareIt}
            onSquareIt={() => {
              this.setState({ squareIt: !this.state.squareIt }, () =>
                this.onImageLoad()
              );
            }}
            onImageChange={this.onImageSelect}
            onBackgroundColorChange={this.onBackgroundColorChange}
            backgroundColor={this.state.backgroundColor}
          />
        </div>
      </div>
    );
  }
}

export default App;
