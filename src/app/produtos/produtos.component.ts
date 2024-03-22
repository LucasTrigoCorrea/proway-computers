import { CurrencyPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProduto, produtos } from '../produtos';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { ProdutosService } from '../produtos.service';
import { FormsModule } from '@angular/forms';
import { BarraDePesquisaComponent } from '../barra-de-pesquisa/barra-de-pesquisa.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [NgFor,FormsModule, ProdutosComponent, CurrencyPipe, RouterLink, DetalhesProdutoComponent, BarraDePesquisaComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements OnInit {
  produtos: IProduto[] | undefined;

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const produtos = this.produtosService.getAll();
    this.route.queryParamMap.subscribe(params => {
      const descricao = params.get("descricao")?.toLowerCase();

      if(descricao){
        this.produtos = produtos.filter(produto => produto.descricao.toLowerCase().includes(descricao));
        return;
      } else {
        this.produtos = produtos;
      }
    })
  }

}
