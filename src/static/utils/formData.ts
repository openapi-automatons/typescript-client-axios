import { serialize } from 'object-to-formdata';

export const formData = <T = unknown>(type: string, form: T): T | FormData => {
	switch(type) {
		case 'multipart/form-data':
			return serialize(form);
		default:
			return form;
	}
}
