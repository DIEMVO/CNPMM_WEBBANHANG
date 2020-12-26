import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from './../actions/productActions';
import {useParams} from 'react-router-dom';
import LoadingBox from './../components/LoadingBox';
import MessageBox from './../components/MessageBox';
import Product from './../components/Product';

export default function SearchResultScreen(props) {
  const { name = "all" } = useParams(); //hook
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({ name: name !== "all" ? name : "" })); //all lay het product ra
  }, [dispatch, name]);
  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>
          <ul>
            <li>Catogory</li>
          </ul>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="row center">
                {products.map(product => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
