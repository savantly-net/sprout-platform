ALTER TABLE DASHBOARDS 
ADD currentVersion boolean not null DEFAULT false,
ADD message varchar(256);