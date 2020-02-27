import React from 'react';
import axios from 'axios';

import styles from './OutletViewer.module.css'

const OutletViewer = ( props ) => {

  // let selections = []

  const handleCategorySelect = ( action, category_name, category_url ) => {
    console.log('handleCategorySelect', action, category_name);

    let selections = {
      outlet_name: props.outletInfo.outlet_name,
      category_name,
      category_url,
      action,
    }

    console.log(selections);

      //ajax post
      let url;
      if ( process.env.NODE_ENV !== 'production') {
        url = 'http://localhost:5000';
      }


      axios.post(`${url}/user2/outlets/update`,{
          selections
      })
        .then( res => {
          console.log('res from post', res);
        })
        .catch( err => console.warn( err ))


  }





  return(
    <div className={ styles.container } key={ props.outletInfo.outlet_name}>
      <div className={ styles.header }>{ props.outletInfo.outlet_name }</div>
      <div className={ styles.categoryContainer }>
      <div className={ styles.categoriesTitle }>
          <h2>Available Categories</h2>
      </div>
        {
          props.outletInfo.categories.map( c => {
            return (
              <div className={ styles.categoryType }>
                <h4 className={ styles.categoryTitle}>{ c.category_name }</h4>
                <button className={ styles.categorySelect } onClick={ () => handleCategorySelect( 'add', c.category_name, c.category_url ) }>Add</button>
                <button className={ styles.categorySelect } onClick={ () => handleCategorySelect( 'remove', c.category_name, c.category_url ) }>Remove</button>
              </div>
            )
          })
        }
      </div>

    </div>
  )
};

export default OutletViewer

// for passing selections back to profile



// <button onClick={ () => handleSubmit( props.outletInfo.outlet_name, selections ) }>Submit Subscriptions</button>

  // <button onClick={ () => props.submitSelections( props.outletInfo.outlet_name, selections ) }>Submit Subscriptions</button>