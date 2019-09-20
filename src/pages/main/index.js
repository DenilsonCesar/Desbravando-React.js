import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import api from '../../services/api'

import '../../styles.css'
import './styles.css'


export default class pages extends Component {

  state={
    products: [],
    productInfo: {},
    page: 1
  }

  componentDidMount(){
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);
    //separando os produtos das outras informações da tabela
    //docs armazena todo os produtos
    //productInfo armazena o restante da tabela
    const { docs, ...productInfo } = response.data;
    //page para atualiza-lo cada vez que for clicado no prox e no ant
    this.setState({products: docs, productInfo, page});
  }

  prevPage = () => {
    const { page, productInfo } = this.state;

    if(page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber)
  }

  nextPage = () => {
    const { page, productInfo } = this.state;

    if(page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber)
  }

  render() {
    const { products, page,  productInfo } = this.state;

    return(
        <div className="products-list">
          {products.map( product => (
            <article key={product._id}>
              <strong>{product.title}</strong>
              <p>{product.description}</p>

              <Link to={`products/${product._id}`}>Acessar</Link>
            </article>
          ))}
            <div className='actions'>
                <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
            </div>
        </div>
    )
  }
}
