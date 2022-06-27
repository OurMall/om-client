import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastrModule } from 'ngx-toastr';
import { SocketIoModule } from 'ngx-socket-io';

import { environment } from '@environment/environment';
import { SharedModule } from '@shared/shared.module';
import { PrimeModule } from '@shared/prime.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { EndpointInterceptor } from '@app/common/interceptors';
import { LoggedInGuard, NotLoggedGuard } from '@app/common/guards';
import { WorkspaceNamespace } from '@app/common/services';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		SharedModule,
		PrimeModule,
		FormsModule,
		ReactiveFormsModule,
		ToastrModule.forRoot({
			closeButton: true,
			timeOut: 5000,
			extendedTimeOut: 2000,
			progressBar: true,
			positionClass: 'toast-top-right',
			tapToDismiss: true,
			onActivateTick: true,
			maxOpened: 3,
			autoDismiss: true,
			//iconClasses: {},
			preventDuplicates: true,
		}),
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			registrationStrategy: 'registerWhenStable:30000',
		}),
		SocketIoModule
	],
	providers: [
		LoggedInGuard,
		NotLoggedGuard,
		WorkspaceNamespace,
		DialogService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: EndpointInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
