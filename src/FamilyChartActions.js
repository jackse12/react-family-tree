import React from "react";
import f3 from "family-chart"; // npm i family-chart
import "./family-chart.css"; // create file 'family-chart.css' in same directory, copy/paste css from examples/create-tree
import Edit from './elements/Edit.js'
import ReactiveTextarea from "./elements/ReactiveTextarea.js"
import ReactiveVanila from "./elements/ReactiveVanila.js"
import ReactiveVue from "./elements/ReactiveVue.js"
import ReactiveReact from "./elements/ReactiveReact.js"
import Display from "./elements/Display.js"
import M from "materialize-css";
import { Form } from "./view/elements/Form.js"
export default class FamilyTree extends React.Component {
  contRef = React.createRef();

  componentDidMount() {
    const cont = document.querySelector("#chart")

    const modal = document.body.appendChild(document.createElement("div"));
    modal.setAttribute("id", "form_modal");
    modal.setAttribute("class", "modal");
    M.Modal.init(modal, {});

    if (!this.contRef.current) return;

    const card_dim = { w: 220, h: 70, text_x: 75, text_y: 15, img_w: 60, img_h: 60, img_x: 5, img_y: 5 }
    const card_display = cardDisplay();
    const card_edit = cardEditParams();
    const store = f3.createStore({
      data: data(),
      card_display: [d => d.data.label || '', d => d.data.desc || ''],
      mini_tree: true,
      hide_rels: true,
      node_separation: 250,
      level_separation: 150,
      custom_elements: [{ el: customAddBtn(card_dim), lis: customAddBtnListener, query: ".customAddBtn" }],
      card_dim
    }),
      view = f3.d3AnimationView({
        store,
        cont: document.querySelector("#chart"),
      }),
      Card = f3.elements.Card({
        store,
        svg: view.svg,
        card_dim: {
          w: 220,
          h: 70,
          text_x: 75,
          text_y: 15,
          img_w: 60,
          img_h: 60,
          img_x: 5,
          img_y: 5
        },
        card_display: [
          (d) => `${d.data["first name"] || ""} ${d.data["last name"] || ""}`,
          (d) => `${d.data["birthday"] || ""}`
        ],
        cardEditForm,
        addRelative: f3.handlers.AddRelative({ store, cont, card_dim, cardEditForm, labels: { mother: 'Add mother' } }),
        mini_tree: true,
        link_break: false
      });

    view.setCard(Card);
    store.setOnUpdate((props) => view.update(props || {}));
    store.update.tree({ initial: true });

    function data() {
      return [
        {
          id: "0",
          rels: {
            spouses: null,
            father: null,
            mother: null,
            children: null
          },
          data: {
            "first name": "Agnus",
            "last name": "",
            birthday: "1970",
            avatar:
              "https://static8.depositphotos.com/1009634/988/v/950/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg",
            gender: "M"
          }
        },
        
      ];
    }

    function cardEditForm(props) {
      const postSubmit = props.postSubmit;
      props.postSubmit = (ps_props) => { postSubmit(ps_props) }
      const el = document.querySelector('#form_modal'),
        modal = M.Modal.getInstance(el),
        edit = { el, open: () => modal.open(), close: () => modal.close() }
      Form({ ...props, card_edit, card_display, edit })
    }

    function cardDisplay() {
      const d1 = d => `${d.data['first name'] || ''} ${d.data['last name'] || ''}`,
        d2 = d => `${d.data['birthday'] || ''}`
      d1.create_form = "{first name} {last name}"
      d2.create_form = "{birthday}"

      return [d1, d2]
    }


    function cardEditParams() {
      return [
        { type: 'text', placeholder: 'first name', key: 'first name' },
        { type: 'text', placeholder: 'last name', key: 'last name' },
        { type: 'text', placeholder: 'birthday', key: 'birthday' },
        { type: 'text', placeholder: 'avatar', key: 'avatar' }
      ]
    }
  }



  render() {

    return <div >
      <div className="row">
        <div className="col s12 m9">
          <div className="f3" id="chart" ref={this.contRef}></div>
        </div>
        <div className="col s12 m3">
          <div id="edit_cont" className="card p5"></div>
        </div>
      </div>
    </div>
    // return <div className="f3" id="chart" ref={this.cont}></div>;
    // return <div className="f3" id="FamilyChart" ref={this.cont}></div>;
  }
}

function customAddBtn(card_dim) {
  return (`
    <g class="customAddBtn" style="cursor: pointer">
      <g transform="translate(${card_dim.w - 12},${card_dim.h - 12})scale(.08)">
        <circle r="100" fill="#fff" />
        <g transform="translate(-50,-45)">
          <line
            x1="10" x2="90" y1="50" y2="50"
            stroke="currentColor" stroke-width="20" stroke-linecap="round"
          />
          <line
            x1="50" x2="50" y1="10" y2="90"
            stroke="currentColor" stroke-width="20" stroke-linecap="round"
          />
        </g>
      </g>
    </g>
  `)
}

function customAddBtnListener(store, props) {
  console.log(props.card)
  console.log(props.d)
}
