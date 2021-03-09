import React, { useRef, useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Collapse,IconButton,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from '@material-ui/core';
import Create from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddNewCategoryPrice from "../helpers/AddNewCategoryPrice";
import AddNewProductPrice from "../helpers/AddNewProductPrice";
import EditProductPrice from "../helpers/EditProductPrice";
import EditMainCategoryPrice from "../helpers/EditMainCategoryPrice";
import categoryPriceButtonsList from "../media/json/categoryPriceButtonsList.json";
import {SvgIcon} from "@material-ui/core";
import { connect } from 'react-redux';
import {deleteProduct, deleteCategory} from "../../actions/pricesActions";
import store from "../../store";


function GeneralPrice({updated, priceList}) {
    const classes = useStyles();
    const [hideBtnClicked, sethideBtnClicked] = useState(false);
    const [category, setCategory] = React.useState();
    const [getVisibleAddCategory, setVisibleAddCategory] = useState(false);
    const [getVisibleAddProduct, setVisibleAddProduct] = useState(false);
    const [getVisibleEditProduct, setVisibleEditProduct] = useState(false);
    const [getVisibleEditMainCategory, setVisibleEditMainCategory] = useState(false);

    const setCategoryActive = (activeCategory) => {
        setCategory(activeCategory);
        console.log(activeCategory);
    }
    const ondeliteProduct = (id) => {
      store.dispatch(deleteProduct(id));
      if(updated){
          updated(true);
      }
    }
    const ondeleteCategory = async (id) => {
        await store.dispatch(deleteCategory(id));
        setCategory(null);
        if(updated){
            updated(true);
        }
    }


    const [editProductData, setEditProductData] = useState();
    const handleEditProductClick = (data) => {
        setEditProductData(data);
        setVisibleEditProduct(true);
    }

    return(
        <div>
                <div className="contaoner-info">
                    {hideBtnClicked ? null : (
                        <div className="hide-shedule-btn">
                            <button onClick={() => sethideBtnClicked(true)}></button>
                        </div>
                    )}

                    {!hideBtnClicked ? (
                      <React.Fragment>
                        <div className="title_container_block">
                          Категории
                        </div>
                        <div>
                             <button className="btn_new_category" type="button" onClick={() => setVisibleAddCategory(true)}>
                               Добавить категорию
                             </button>
                            <AddNewCategoryPrice getVisible={getVisibleAddCategory} idCategory={'0'} idPriceList={priceList.id} updatedCategory={updated} visible={setVisibleAddCategory}/>
                           </div>
                            <Grid container>
                            {priceList && priceList.categories ? (
                                Object.keys(priceList.categories).map((item) => {
                                  let allprices = priceList.categories[item];

                                    return (
                                      <Grid item xs={12} sm={2}>
                                      <div className={`item_category_price ${category && category === item ? 'active' : ''}`} onClick={() => setCategoryActive(item)}>
                                          {category && category === item ?
                                              <div className="main_category_icon">
                                                  <IconButton aria-haspopup="true"  onClick={() => setVisibleEditMainCategory(true)} edge="end">
                                                      <Create />
                                                  </IconButton>
                                                  <EditMainCategoryPrice getVisible={getVisibleEditMainCategory}  idPriceList={priceList.id} category={allprices} updatedCategory={updated} visible={setVisibleEditMainCategory}/>
                                                  <IconButton aria-haspopup="true"  onClick={() => ondeleteCategory(allprices.id)} edge="end">
                                                      <DeleteIcon />
                                                  </IconButton>
                                              </div>
                                              : null}
                                          <div className="image_category_price">
                                              {
                                                  Object.keys(categoryPriceButtonsList).map((group) => {
                                                      let groupList = categoryPriceButtonsList[group];
                                                      return (
                                                         <React.Fragment>
                                                             {groupList.id == allprices.id?
                                                                 Object.keys(groupList.buttons).map((id) => {
                                                                         let button = groupList.buttons[id];
                                                                         return(
                                                                             <SvgIcon className="category_svg" viewBox={groupList.viewBox}>
                                                                                 {
                                                                                     Object.keys(button.icon).map((id) => {
                                                                                         let icon = button.icon[id];
                                                                                         return(
                                                                                             <path d={icon.d} fill={icon.fill}/>
                                                                                         )
                                                                                     })
                                                                                 }
                                                                             </SvgIcon>
                                                                         )
                                                                     }):
                                                                null
                                                             }

                                                         </React.Fragment>
                                                      );
                                                  })
                                              }

                                          </div>
                                          <div className="title_category_price">{allprices.name}</div>
                                        </div>
                                      </Grid>
                                    )
                                })
                            ): (null)
                            }


                            </Grid>
                            </React.Fragment>

                    ) : (
                        <div className="show-shedule-btn pb-4">
                            <div className="row">
                                <div className="col-lg-5 offset-lg-1 left-line">
                                    <hr />
                                </div>
                                <div className="col-lg-1 circle-btn">
                                    <button onClick={() => sethideBtnClicked(false)}>

                                    </button>
                                </div>
                                <div className="col-lg-5 right-line">
                                    <hr />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            {priceList && category ? (
                    <div className="contaoner-info">
                        {hideBtnClicked ? null : (
                            <div className="hide-shedule-btn">
                                <button onClick={() => sethideBtnClicked(true)}></button>
                            </div>
                        )}

                        {!hideBtnClicked ? (
                          <React.Fragment>
                            <div className="title_container_block">
                                {category &&  priceList.categories[category]? priceList.categories[category].name:null}
                            </div>
                            <div>

                                <button className="btn_new_category" type="button" onClick={() => setVisibleAddProduct(true)}> Добавить услугу</button>
                                <AddNewProductPrice updatedProduct={updated} getVisible={getVisibleAddProduct} idPriceList={priceList.id} category={priceList.categories[category]} visible={setVisibleAddProduct}/>
                               </div>

                              { (category !== undefined?
                                     <React.Fragment>
                                         {getVisibleEditProduct &&
                                            <EditProductPrice data={editProductData} visible={setVisibleEditProduct} updatedProduct={updated}/>
                                         }
                                     <TableContainer className={`custom-table`} component={Paper}>
                                         <Table aria-label="collapsible table">
                                         <TableHead>
                                           <TableRow>
                                             <TableCell />
                                             <TableCell>Код</TableCell>
                                             <TableCell align="left">Наименование</TableCell>
                                             <TableCell align="left">Сумма</TableCell>
                                             <TableCell />
                                             <TableCell />
                                           </TableRow>
                                         </TableHead>
                                         <TableBody>
                                             {priceList.categories[category] && priceList.categories[category].products ?(
                                                Object.keys(priceList.categories[category].products).map((item) => {
                                                 let productItem = priceList.categories[category].products[item];
                                                return(
                                                    <TableRow className={[classes.root]}>
                                                        <TableCell align="left"></TableCell>
                                                        <TableCell>{productItem.code}</TableCell>
                                                        <TableCell align="left">{productItem.name}</TableCell>
                                                        <TableCell align="left">{productItem.base_price}</TableCell>
                                                        <TableCell align="right">
                                                            <div>
                                                                <IconButton aria-haspopup="true"  onClick={() => handleEditProductClick({
                                                                    "idPriceList": priceList.id,
                                                                    "category": productItem,
                                                                })} edge="end">
                                                                    <Create  fontSize="small"/>
                                                                </IconButton>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <div>
                                                                <IconButton aria-haspopup="true"  edge="end">
                                                                    <DeleteIcon onClick={() => ondeliteProduct(productItem.id)} fontSize="small"/>
                                                                </IconButton>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                             }))
                                                 : null}

                                         </TableBody>
                                         </Table>
                                     </TableContainer>
                                     </React.Fragment>
                                   :null)

                               }
                            </React.Fragment>
                        ) : (
                            <div className="show-shedule-btn pb-4">
                                <div className="row">
                                    <div className="col-lg-5 offset-lg-1 left-line">
                                        <hr />
                                    </div>
                                    <div className="col-lg-1 circle-btn">
                                        <button onClick={() => sethideBtnClicked(false)}>

                                        </button>
                                    </div>
                                    <div className="col-lg-5 right-line">
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>):null}
        </div>
    );
}

const mapStateToProps = (state) => ({
    prices: state.prices.items
});

export default connect(mapStateToProps, { deleteProduct, deleteCategory })(GeneralPrice);


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& .MuiTableSortLabel-active': {
            color: '#F08786',
        },
    },

    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    modal: {
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
 },
 paper: {
     width: '100%',
     marginBottom: theme.spacing(2),
   background: "#F6F7F8",
   boxShadow: "0px 2px 14px rgba(0, 0, 0, 0.3)",
   borderRadius: 5,
   padding:52
 },
}));
