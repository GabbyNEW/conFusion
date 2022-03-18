// A typical Angular app is a hierarchy of modules, with a root module.

// This file is a companion to the index.html page

// import this module from the angular core library
import { enableProdMode } from '@angular/core';
// enables to bootstrap app by taking root module as parameter
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule) // root module
  .catch(err => console.error(err));
