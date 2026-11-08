"use client";
import Image from "next/image";
import Link from "next/link";
import {useMemo,useState} from "react";
import {ArrowRight,Search,ShoppingBag} from "lucide-react";
import {categories,money,products} from "@/lib/products";

export default function Home(){
  const [category,setCategory]=useState("All products");
  const [query,setQuery]=useState("");
  const [sort,setSort]=useState("featured");
  const [bag,setBag]=useState(0);
  const [showAll,setShowAll]=useState(false);

  const filtered=useMemo(()=>{
    const list=products.filter(p=>(category==="All products"||p.category===category)&&p.name.toLowerCase().includes(query.toLowerCase()));
    if(sort==="low")list.sort((a,b)=>a.price-b.price);
    if(sort==="high")list.sort((a,b)=>b.price-a.price);
    return list;
  },[category,query,sort]);
  const showFullCatalogue=showAll||query.length>0||category!=="All products";
  const shown=showFullCatalogue?filtered:filtered.slice(0,4);

  return <main>
    <div className="top">A LITTLE SOMETHING EXTRA · DISCOVER EVERYDAY FINDS AT ABOTIK SHOP</div>
    <header><div className="wrap head">
      <Link href="/" className="logo">abotik<span>.</span></Link>
      <nav className="links"><a href="#shop">Shop</a><a href="#categories">Categories</a><a href="#story">Our story</a></nav>
      <Link href="/cart" className="bag-link"><ShoppingBag size={17}/> Bag ({bag})</Link>
    </div></header>

    <section className="hero"><div className="wrap hero-grid">
      <div><div className="eyebrow">GOOD FINDS. GOOD EVERYDAY.</div>
        <h1>Find your next <span className="green">favourite.</span></h1>
        <p>Thoughtfully selected essentials and useful little discoveries for everyday living.</p>
        <a className="btn" href="#shop">Explore the collection <ArrowRight size={15}/></a>
      </div>
      <Image className="hero-img" src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=1200&q=90" alt="Curated lifestyle products" width={1000} height={700} priority/>
    </div></section>

    <section className="section categories-section" id="categories"><div className="wrap">
      <div className="section-heading"><div><div className="eyebrow">A GOOD PLACE TO START</div><h2>Shop by category</h2></div>
        <p className="muted">A few thoughtful collections to explore.</p></div>
      <div className="categories">{categories.filter(c=>c!=="All products").map((c,i)=><button className="category" key={c} onClick={()=>{setCategory(c);setShowAll(true);document.getElementById("shop")?.scrollIntoView({behavior:"smooth"})}}>
        <span className="category-mark">{["⌁","◇","⌂","✧"][i]}</span><b>{c}</b><span className="category-count">{products.filter(p=>p.category===c).length} items <ArrowRight size={13}/></span>
      </button>)}</div>
    </div></section>

    <section className="section catalog" id="shop"><div className="wrap">
      <div className="section-heading"><div><div className="eyebrow">THE ABOTIK EDIT</div><h2>{category==="All products"?"A few good finds":category}</h2><p className="muted">Useful things, chosen with care.</p></div>
        <div className="toolbar">
          <label className="search-field"><Search size={16}/><input aria-label="Search products" placeholder="Find a product..." value={query} onChange={e=>setQuery(e.target.value)}/></label>
          <select aria-label="Sort products" value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
        </div>
      </div>
      <div className="category-filters">{categories.map(c=><button className={category===c?"filter active":"filter"} key={c} onClick={()=>{setCategory(c);setShowAll(c!=="All products")}}>{c}</button>)}</div>
      <div className="grid">{shown.length?shown.map(p=><article className="card" key={p.id}>
        <Link href={"/products/"+p.slug} className="product-image-link"><div className="product-image-wrap">
          <Image src={p.image} alt={p.name} width={500} height={500}/>
          {p.tag&&<span className="product-tag">{p.tag}</span>}
        </div></Link>
        <div className="card-body"><small className="product-category">{p.category}</small>
          <h3><Link href={"/products/"+p.slug}>{p.name}</Link></h3>
          <small className="rating">★ {p.rating} · Demo rating</small>
          <div className="card-bottom"><div className="price-group">
            {p.compareAtPrice&&<span className="was-price">{money(p.compareAtPrice)}</span>}
            <span className="price">{money(p.price)}</span>
            {p.compareAtPrice&&<span className="saving">Save {Math.round((1-p.price/p.compareAtPrice)*100)}%</span>}
          </div><button className="add-button" aria-label={"Add "+p.name+" to bag"} onClick={()=>setBag(v=>v+1)}>+</button></div>
        </div>
      </article>):<p>No products found. Try another search.</p>}</div>
      {!showFullCatalogue&&filtered.length>4&&<div className="catalog-more"><button className="text-link" onClick={()=>setShowAll(true)}>View all {filtered.length} products <ArrowRight size={14}/></button></div>}
      {showFullCatalogue&&category==="All products"&&!query&&<div className="catalog-more"><button className="text-link" onClick={()=>setShowAll(false)}>Show featured products</button></div>}
    </div></section>

    <section className="section story-section" id="story"><div className="wrap story-panel">
      <div><div className="eyebrow">A LITTLE ABOUT US</div><h2>Good things, without the noise.</h2><p>Everyday essentials and useful discoveries, thoughtfully brought together.</p></div>
      <a className="story-link" href="#shop">Explore the shop <ArrowRight size={15}/></a>
    </div></section>
    <footer className="footer"><div className="wrap footer-inner"><Link href="/" className="logo">abotik<span>.</span></Link><p>Everyday essentials, useful discoveries and thoughtful finds.</p><small>© 2026 Abotik Shop · Frontend demonstration. Products and prices are placeholders.</small></div></footer>
  </main>;
}