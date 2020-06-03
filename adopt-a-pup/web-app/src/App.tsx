import React, { Component } from "react";
import Structure from "./Layout";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SheltersView from "./Views/SheltersView";
import NewsView from "./Views/NewsView";
import ShelterFakeService from "./Services/ShelterFakeService";
import NewsFakeService from "./Services/NewsFakeService";
import AnimalFakeService from "./Services/AnimalFakeService";
import AnimalsView from "./Views/AnimalsView";
import HomeView from "./Views/HomeView";
import AdoptionFakeService from "./Services/AdoptionFakeService";
import ShelterRESTService from "./Services/ShelterRESTService";
import AdoptionRESTService from "./Services/AdoptionRESTService";
import AnimalRESTService from "./Services/AnimalRESTService";
import { NewsService } from "./Services/NewsService";
import { AnimalService } from "./Services/AnimalService";
import { AdoptionService } from "./Services/AdoptionService";
import { ShelterService } from "./Services/ShelterService";
import AnimalDetailsView from "./Views/AnimalDetailsView";
import ShelterDetailsView from "./Views/ShelterDetailsView";
import Environment from "./Services/Environment";
import NewsRESTService from "./Services/NewsRESTService";


// Initialize Backend Services
let animalService: AnimalService;
let adoptionService: AdoptionService;
let shelterService: ShelterService;
let newsService: NewsService;
const ADOPTION_SERVICE_URL = Environment.get("REACT_APP_ADOPTION_SERVICE_URL");
const ANIMAL_SERVICE_URL = Environment.get("REACT_APP_ANIMAL_SERVICE_URL");
const SHELTER_SERVICE_URL = Environment.get("REACT_APP_SHELTER_SERVICE_URL");
const NEWS_ENABLED = Environment.get("REACT_APP_NEWS_ENABLED");
const NEWS_SERVICE_URL = Environment.get("REACT_APP_NEWS_SERVICE_URL");

if (ADOPTION_SERVICE_URL) {
    adoptionService = new AdoptionRESTService(ADOPTION_SERVICE_URL);
} else {
    console.log("Warning: No adoption service url provided. Using AdoptionFakeService");
    adoptionService = new AdoptionFakeService();
}

if (ANIMAL_SERVICE_URL) {
    animalService = new AnimalRESTService(ANIMAL_SERVICE_URL);
} else {
    console.log("Warning: No animal service url provided. Using AnimalFakeService");
    animalService = new AnimalFakeService();
}

if (SHELTER_SERVICE_URL) {
    shelterService = new ShelterRESTService(SHELTER_SERVICE_URL);
} else {
    console.log("Warning: No shelter service url provided. Using ShelterFakeService");
    shelterService = new ShelterFakeService();
}

if (NEWS_ENABLED && SHELTER_SERVICE_URL) {
    newsService = new NewsRESTService(NEWS_SERVICE_URL);
} else {
    console.log("Warning: No news service url provided. Using NewsFakeService");
    newsService = new NewsFakeService();
}



// Declare the root application component
export default class App extends Component {
    render() {
        return (
            <Router basename="/frontend">
                <Switch>
                    <Structure>
                        <Route path="/" exact >
                            <HomeView />
                        </Route>
                        <Route path="/shelters" exact>
                            <SheltersView shelterService={shelterService} />
                        </Route>
                        <Route path="/animals" exact>
                            <AnimalsView
                                animalService={animalService}
                                adoptionService={adoptionService}
                            />
                        </Route>
                        {NEWS_ENABLED &&
                        <Route path="/news" exact>
                            <NewsView newsService={newsService} />
                        </Route>
                        }
                        <Route path={"/animals/:animalId"} render={ (props) =>
                            <AnimalDetailsView {...props}
                                animalService={animalService}
                                adoptionService={adoptionService}
                            /> } >
                        </Route>
                        <Route path={"/shelters/:shelterId"} render={ (props) =>
                            <ShelterDetailsView {...props}
                                shelterService={shelterService}
                                adoptionService={adoptionService}
                            /> } >
                        </Route>
                    </Structure>
                </Switch>
            </Router>
        );
    }
}
