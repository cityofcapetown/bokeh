import {Control, ControlView} from "./control"
import {CallbackLike0} from "../callbacks/callback"

import {div, label} from "core/dom"
import * as p from "core/properties"

import {bk_input_group} from "styles/widgets/inputs"

export abstract class InputWidgetView extends ControlView {
  model: InputWidget

  protected label_el: HTMLLabelElement
  protected group_el: HTMLElement

  connect_signals(): void {
    super.connect_signals()
    this.connect(this.model.properties.title.change, () => {
      this.label_el.textContent = this.model.title
    })
  }

  render(): void {
    super.render()

    const {title} = this.model
    this.label_el = label({style: {display: title.length == 0 ? "none" : ""}}, title)

    this.group_el = div({class: bk_input_group}, this.label_el)
    this.el.appendChild(this.group_el)
  }

  change_input(): void { }
}

export namespace InputWidget {
  export type Attrs = p.AttrsOf<Props>

  export type Props = Control.Props & {
    title: p.Property<string>
    callback: p.Property<CallbackLike0<InputWidget> | null>
  }
}

export interface InputWidget extends InputWidget.Attrs {}

export abstract class InputWidget extends Control {
  properties: InputWidget.Props

  constructor(attrs?: Partial<InputWidget.Attrs>) {
    super(attrs)
  }

  static init_InputWidget(): void {
    this.define<InputWidget.Props>({
      title:    [ p.String, "" ],
      callback: [ p.Any        ],
    })
  }
}
