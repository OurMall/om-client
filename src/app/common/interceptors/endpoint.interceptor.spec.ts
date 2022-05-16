import { TestBed } from '@angular/core/testing';

import { EndpointInterceptor } from './endpoint.interceptor';

describe('EndpointInterceptor', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [EndpointInterceptor],
		})
	);

	it('should be created', () => {
		const interceptor: EndpointInterceptor = TestBed.inject(EndpointInterceptor);
		expect(interceptor).toBeTruthy();
	});
});
