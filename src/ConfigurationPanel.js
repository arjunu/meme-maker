import React, { Component } from "react";
import classNames from "classnames";

import styles from "./ConfigurationPanel.module.scss";

const FormRow = ({ children }) => (
  <div className={styles.formRow}>{children}</div>
);
const Label = ({ children }) => <div className={styles.label}>{children}</div>;

const Swatch = ({ className, active, onClick }) => (
  <span
    className={classNames(styles.swatch, className, {
      [styles.selected]: active,
    })}
    onClick={onClick}
  />
);

class ConfigurationPanel extends Component {
  render() {
    const { onImageChange, onBackgroundColorChange, backgroundColor } =
      this.props;

    return (
      <div className={styles.wrapper}>
        <FormRow>
          <Label>Image</Label>
          <div>
            <input type="file" id="file" onChange={onImageChange} />
          </div>
        </FormRow>

        <FormRow className={styles.formRow}>
          <Label>Background</Label>
          <div>
            <Swatch
              className={styles.black}
              onClick={() => onBackgroundColorChange("black")}
              active={backgroundColor === "black"}
            />

            <Swatch
              className={styles.white}
              onClick={() => onBackgroundColorChange("white")}
              active={backgroundColor === "white"}
            />
          </div>
        </FormRow>

        <FormRow className={styles.formRow}>
          <Label>Download</Label>
          <div className={styles.hint}>Right Click -> Save Image As...</div>
        </FormRow>
      </div>
    );
  }
}

export default ConfigurationPanel;
