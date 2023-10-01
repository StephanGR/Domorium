import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <header className="masthead">
                <div className="container d-flex h-100 align-items-center">
                    <div className="mx-auto text-center">
                        <h1 className="mx-auto my-0 text-uppercase">DOMORIUM</h1>
                        <h2 className="text-white-50 mx-auto mt-2 mb-5">L'outil ultime pour tous les passionnés d'aquariums !</h2>
                        <a href="#about" className="btn btn-primary js-scroll-trigger">En savoir plus</a>
                        <br />
                        <a href="/login" className="btn btn-secondary mt-3">Se connecter / S'inscrire</a>
                    </div>
                </div>
            </header>

            <section id="about" className="about-section text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <h2 className="text-white mb-4">Pourquoi choisir Domorium ?</h2>
                            <p className="text-white-50">
                                - <strong>Simplicité Ultime</strong> : Avec une interface épurée et intuitive, même les moins technophiles d'entre vous trouveront Domorium facile à utiliser.<br />
                                - <strong>Tout-en-un</strong> : Fini les carnets, les tableaux et les applications compliquées. Avec Domorium, suivez la santé de vos poissons, la qualité de votre eau, et bien plus encore, tout au même endroit.<br />
                                - <strong>Des Mesures Précises</strong> : Entrez vos mesures, et laissez Domorium faire le reste. Suivez l'évolution de vos paramètres en temps réel et assurez-vous que vos poissons vivent dans un environnement optimal.<br />
                                - <strong>Photos & Historiques</strong> : Ajoutez une touche personnelle en téléchargeant des photos de vos aquariums. Gardez également un œil sur l'historique des changements d'eau pour une meilleure gestion.<br />
                                - <strong>Gratuit & Sécurisé</strong> : Oui, vous avez bien lu. Domorium est totalement gratuit. De plus, nous prenons la sécurité de vos données très au sérieux.<br />
                            </p>
                            <h3 className="text-white mt-4">Rejoignez la communauté Domorium dès aujourd'hui et transformez votre passion en une expérience sans précédent !</h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
