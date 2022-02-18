start-scheduler:
	$(MAKE) -C clients start-scheduler

build-scheduler:
	$(MAKE) -C clients build-scheduler

test-scheduler:
	$(MAKE) -C clients test-scheduler

update-snapshots-scheduler:
	$(MAKE) -C clients update-snapshots-scheduler

start-appointments:
	$(MAKE) -C clients start-appointments

build-appointments:
	$(MAKE) -C clients build-appointments

test-appointments:
	$(MAKE) -C clients test-appointments

update-snapshots-appointments:
	$(MAKE) -C clients update-snapshots-appointments

test-common:
	$(MAKE) -C clients test-common

update-snapshots-common:
	$(MAKE) -C clients update-snapshots-common

build-proxy:
	$(MAKE) -C proxy build-proxy

start-proxy:
	$(MAKE) -C proxy start-proxy
