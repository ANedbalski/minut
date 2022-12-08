run: 
	docker build . -t minute_test_app
	docker run -p 8089:8089 -d minute_test_app