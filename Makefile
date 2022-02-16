start-scheduler:
	$(MAKE) -C clients start-scheduler

start-appointments:
	$(MAKE) -C clients start-appointments

build-proxy:
	$(MAKE) -C proxy build-proxy

start-proxy:
	$(MAKE) -C proxy start-proxy
