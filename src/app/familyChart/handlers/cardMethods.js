import {toggleAllRels, toggleRels} from "../CalculateTree/CalculateTree.handlers.js"
import AddRelativeTree from "../AddRelativeTree/AddRelativeTree.js"
import {deletePerson, moveToAddToAdded} from "./general.js"

export function cardChangeMain(store, {card, d}) {
  toggleAllRels(store.getTree().data, false)
  store.update.mainId(d.data.id)
  store.update.tree({tree_position: 'inherit'})
  return true
}

export function cardEdit(store, {card, d, cardEditForm}) {
  const datum = d.data,
    postSubmit = (props) => {
      console.log("postSubmit 2")
      if (datum.to_add) moveToAddToAdded(datum, store.getData())
      if (props && props.delete) {
        if (datum.main) store.update.mainId(null)
        deletePerson(datum, store.getData())
      }
      store.update.tree()
      // localStorage.setItem('datum', datum);
      // if (!localStorage.getItem('treeData')) {
      //   let dataTree = localStorage.getItem('treeData');
      
      //   dataTree = dataTree?.map((item)=>{
      //     let newItem = 


      //     return 
      //   })

      
      // }

      console.log("store.getData()")
    }
  cardEditForm({datum, postSubmit, store})
}

export function cardShowHideRels(store, {card, d}) {
  d.data.hide_rels = !d.data.hide_rels
  toggleRels(d, d.data.hide_rels)
  store.update.tree({tree_position: 'inherit'})
}