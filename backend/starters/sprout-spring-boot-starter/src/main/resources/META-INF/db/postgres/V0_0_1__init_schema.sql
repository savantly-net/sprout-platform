create table IF NOT EXISTS app_users (
   item_id VARCHAR(42) not null,
    TENANT_ID varchar(255) not null,
    createdBy varchar(255),
    createdDate timestamp,
    lastModifiedBy varchar(255),
    lastModifiedDate timestamp,
    version bigint,
    accountNonExpired boolean not null,
    accountNonLocked boolean not null,
    credentialsNonExpired boolean not null,
    displayName varchar(255),
    enabled boolean not null,
    firstName varchar(255),
    hidePrimaryEmailAddress boolean not null,
    lastName varchar(255),
    password varchar(60),
    phoneNumber varchar(255),
    username varchar(255),
    organization_id VARCHAR(36),
    primary key (item_id, TENANT_ID),
	CONSTRAINT uk_username_tenant unique (username, TENANT_ID)
);

create table IF NOT EXISTS APP_EMAIL_ADDRESS (
   item_id VARCHAR(42) not null,
    TENANT_ID varchar(255) not null,
    createdBy varchar(255),
    createdDate timestamp,
    lastModifiedBy varchar(255),
    lastModifiedDate timestamp,
    version bigint,
    emailAddress varchar(255),
    IS_PRIMARY boolean,
    verified boolean not null,
    user_item_id VARCHAR(42),
    user_TENANT_ID varchar(255),
    PRIMARY KEY (item_id, tenant_id),
    CONSTRAINT fk_app_users FOREIGN KEY (user_tenant_id, user_item_id)
        REFERENCES app_users (tenant_id, item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

create table IF NOT EXISTS APP_ORGANIZATION (
   id VARCHAR(36) not null,
    createdBy varchar(255),
    createdDate timestamp,
    lastModifiedBy varchar(255),
    lastModifiedDate timestamp,
    version bigint,
    name varchar(255),
    tenantId varchar(255),
    primary key (id)
);

create table IF NOT EXISTS app_persistent_audit_event (
   event_id BIGSERIAL,
    event_date timestamp,
    event_type varchar(255),
    principal varchar(255) not null,
    primary key (event_id)
);

create table IF NOT EXISTS APP_USER_EMAIL_ADDRESS (
   SproutUserEntity_item_id VARCHAR(42) not null,
    SproutUserEntity_TENANT_ID varchar(255) not null,
    emailAddresses_item_id VARCHAR(42) not null,
    emailAddresses_TENANT_ID varchar(255) not null,
    CONSTRAINT app_user_email_address_pkey PRIMARY KEY (sproutuserentity_item_id, sproutuserentity_tenant_id, emailaddresses_item_id, emailaddresses_tenant_id),
    CONSTRAINT uk_user_email_address UNIQUE (emailaddresses_item_id, emailaddresses_tenant_id),
    CONSTRAINT fk_email_addresses_app_users FOREIGN KEY (sproutuserentity_tenant_id, sproutuserentity_item_id)
        REFERENCES app_users (tenant_id, item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_email_addresses_app_email_address FOREIGN KEY (emailaddresses_item_id, emailaddresses_tenant_id)
        REFERENCES app_email_address (item_id, tenant_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

create table IF NOT EXISTS DASHBOARDS (
   id varchar(255) not null,
    ITEM_VERSION bigint not null,
    createdBy varchar(255),
    createdDate timestamp,
    lastModifiedBy varchar(255),
    lastModifiedDate timestamp,
    TENANT_ID varchar(255),
    deleted boolean not null,
    editable boolean not null,
    folder varchar(255),
    hideControls boolean not null,
    schemaVersion bigint not null,
    title varchar(255),
    primary key (id, ITEM_VERSION)
);

create table IF NOT EXISTS DASHBOARD_LINKS (
   Dashboard_id varchar(255) not null,
    Dashboard_ITEM_VERSION bigint not null,
    href varchar(255),
    target varchar(255),
    title varchar(255),
    index_id integer not null,
    primary key (Dashboard_id, Dashboard_ITEM_VERSION, index_id),
	CONSTRAINT fk_dashboard_link_dashboard
    	foreign key (Dashboard_id, Dashboard_ITEM_VERSION) 
    	references DASHBOARDS
);

create table IF NOT EXISTS DASHBOARD_PANELS (
   Dashboard_id varchar(255) not null,
    Dashboard_ITEM_VERSION bigint not null,
    h integer not null,
    w integer not null,
    x integer not null,
    y integer not null,
    id integer not null,
    options varchar(64000),
    pluginVersion varchar(255),
    title varchar(255),
    transparent boolean not null,
    panel_type varchar(255),
    index_id integer not null,
    primary key (Dashboard_id, Dashboard_ITEM_VERSION, index_id),
	CONSTRAINT fk_dashboard_panel_dashboard 
    	foreign key (Dashboard_id, Dashboard_ITEM_VERSION) 
   		references DASHBOARDS
);

create table IF NOT EXISTS DASHBOARD_TAGS (
   Dashboard_id varchar(255) not null,
    Dashboard_ITEM_VERSION bigint not null,
    tags varchar(255),
    index_id integer not null,
    primary key (Dashboard_id, Dashboard_ITEM_VERSION, index_id),
	CONSTRAINT fk_dashboard_tags_dashboard
   		foreign key (Dashboard_id, Dashboard_ITEM_VERSION) 
   		references DASHBOARDS
);


create table IF NOT EXISTS feed_comment (
   item_id VARCHAR(42) not null,
    TENANT_ID varchar(255) not null,
    createdBy varchar(255),
    createdDate timestamp,
    lastModifiedBy varchar(255),
    lastModifiedDate timestamp,
    version bigint,
    feedItemId varchar(255),
    text varchar(5000),
    primary key (item_id, TENANT_ID)
);

create table IF NOT EXISTS feed_post (
   item_id VARCHAR(42) not null,
    TENANT_ID varchar(255) not null,
    createdBy varchar(255),
    createdDate timestamp,
    lastModifiedBy varchar(255),
    lastModifiedDate timestamp,
    version bigint,
    body varchar(5000),
    primary key (item_id, TENANT_ID)
);

create table IF NOT EXISTS FeedPost_tags (
   FeedPost_item_id VARCHAR(42) not null,
    FeedPost_TENANT_ID varchar(255) not null,
    tags varchar(255),
	constraint fk_feedpost_tags_feedpost 
   		foreign key (FeedPost_item_id, FeedPost_TENANT_ID) 
   		references feed_post
);

create table IF NOT EXISTS files (
   id VARCHAR(36) not null,
    createdBy varchar(255),
    createdDate timestamp,
    lastModifiedBy varchar(255),
    lastModifiedDate timestamp,
    version bigint,
    TENANT_ID varchar(255),
    bytes bytea,
    childrenCount bigint not null,
    color varchar(255),
    contentType varchar(255),
    icon varchar(255),
    isDir boolean not null,
    modDate timestamp,
    name varchar(255),
    parent varchar(255),
    size bigint not null,
    thumbnailUrl varchar(255),
    primary key (id),
	CONSTRAINT uk_name_parent_tenant unique (TENANT_ID, name, parent)
);


create table IF NOT EXISTS Folder (
   item_id VARCHAR(42) not null,
    TENANT_ID varchar(255) not null,
    createdBy varchar(255),
    createdDate timestamp,
    lastModifiedBy varchar(255),
    lastModifiedDate timestamp,
    version bigint,
    icon varchar(255),
    name varchar(255),
    parent varchar(255),
    primary key (item_id, TENANT_ID)
);

create table IF NOT EXISTS ISSUES (
   item_id VARCHAR(42) not null,
    TENANT_ID varchar(255) not null,
    createdBy varchar(255),
    createdDate timestamp,
    lastModifiedBy varchar(255),
    lastModifiedDate timestamp,
    version bigint,
    issueId varchar(255),
    text varchar(5000),
    description varchar(5000),
    status integer,
    title varchar(255),
    primary key (item_id, TENANT_ID)
);

create table IF NOT EXISTS Issue_tags (
   Issue_item_id VARCHAR(42) not null,
    Issue_TENANT_ID varchar(255) not null,
    tags varchar(255),
	constraint fk_issue_tags_issues 
   		foreign key (Issue_item_id, Issue_TENANT_ID) 
   		references ISSUES
);

create table IF NOT EXISTS ISSUE_COMMENTS (
   item_id VARCHAR(42) not null,
    TENANT_ID varchar(255) not null,
    createdBy varchar(255),
    createdDate timestamp,
    lastModifiedBy varchar(255),
    lastModifiedDate timestamp,
    version bigint,
    text varchar(5000),
    primary key (item_id, TENANT_ID),
	CONSTRAINT uk_comment_tenant unique (item_id, TENANT_ID)
);
create table IF NOT EXISTS ISSUES_ISSUE_COMMENTS (
   Issue_item_id VARCHAR(42) not null,
    Issue_TENANT_ID varchar(255) not null,
    comments_item_id VARCHAR(42) not null,
    comments_TENANT_ID varchar(255) not null,
    primary key (Issue_item_id, Issue_TENANT_ID, comments_item_id, comments_TENANT_ID)
);

create table IF NOT EXISTS MENU (
   id VARCHAR(36) not null,
    createdBy varchar(255),
    createdDate timestamp,
    lastModifiedBy varchar(255),
    lastModifiedDate timestamp,
    version bigint,
    TENANT_ID varchar(255),
    _public boolean not null,
    disabled boolean not null,
    displayText varchar(255),
    icon varchar(255),
    name varchar(255),
    parentName varchar(255),
    weight integer not null,
    url varchar(255),
    primary key (id),
	CONSTRAINT uk_name_tenant unique (TENANT_ID, name)
);

create table IF NOT EXISTS MENU_AUTHORITIES (
   Menu_id VARCHAR(36) not null,
    authority varchar(255),
	constraint fk_menu_authorites_menu 
   		foreign key (Menu_id) 
   		references MENU
);

create table IF NOT EXISTS persistent_audit_evt_data (
   event_id bigint not null,
    value varchar(255),
    name varchar(255) not null,
    primary key (event_id, name),
	constraint fk_persistent_audit_evt_data_app_persistent_audit_event 
   		foreign key (event_id) 
   		references app_persistent_audit_event
);

create table IF NOT EXISTS PLUGIN_CONFIGURATION (
   item_id VARCHAR(42) not null,
    TENANT_ID varchar(255) not null,
    createdBy varchar(255),
    createdDate timestamp,
    lastModifiedBy varchar(255),
    lastModifiedDate timestamp,
    version bigint,
    jsonData varchar(64000),
    secureJsonData varchar(64000),
    primary key (item_id, TENANT_ID)
);

create table IF NOT EXISTS APP_PRIVILEGE (
   id VARCHAR(36) not null,
    createdBy varchar(255),
    createdDate timestamp,
    lastModifiedBy varchar(255),
    lastModifiedDate timestamp,
    version bigint,
    TENANT_ID varchar(255),
    name varchar(255),
    primary key (id)
);

create table IF NOT EXISTS APP_ROLE (
   id VARCHAR(36) not null,
    createdBy varchar(255),
    createdDate timestamp,
    lastModifiedBy varchar(255),
    lastModifiedDate timestamp,
    version bigint,
    TENANT_ID varchar(255),
    name varchar(255),
    primary key (id)
);

create table IF NOT EXISTS APP_ROLE_APP_PRIVILEGE (
   app_role_id VARCHAR(36) not null,
    app_privilege_id VARCHAR(36) not null,
    primary key (app_role_id, app_privilege_id),
	constraint fk_app_role_privilege_app_privilege 
   		foreign key (app_privilege_id) 
   		references APP_PRIVILEGE,
	constraint fk_app_role_privilege_app_role 
   		foreign key (app_role_id) 
   		references APP_ROLE
);

create table IF NOT EXISTS app_user_app_role (
   user_id VARCHAR(42) not null,
    user_tenant_id varchar(255) not null,
    app_role_id VARCHAR(36) not null,
    primary key (user_id, user_tenant_id, app_role_id),
	constraint fk_user_app_role_app_role 
   		foreign key (app_role_id) 
   		references APP_ROLE,
   	constraint fk_user_app_role_app_users
   		foreign key (user_id, user_tenant_id) 
   		references app_users
);

create table IF NOT EXISTS sprout_module_registration (
   id CHAR(100) not null,
    description varchar(255),
    isPlugin boolean not null,
    name varchar(255),
    pluginType integer,
    version varchar(255),
    beanName varchar(255),
    primary key (id)
);

create table IF NOT EXISTS TENANT (
   id VARCHAR(36) not null,
    createdBy varchar(255),
    createdDate timestamp,
    lastModifiedBy varchar(255),
    lastModifiedDate timestamp,
    version bigint,
    description varchar(255),
    primary key (id)
);

create table IF NOT EXISTS TenantEntity_aliases (
   TenantEntity_id VARCHAR(36) not null,
    aliases varchar(255),
	constraint fk_tenantentity_aliases_tenant 
   		foreign key (TenantEntity_id) 
   		references TENANT
);

create table IF NOT EXISTS UI_PROPERTIES (
   id VARCHAR(36) not null,
    createdBy varchar(255),
    createdDate timestamp,
    lastModifiedBy varchar(255),
    lastModifiedDate timestamp,
    version bigint,
    TENANT_ID varchar(255),
    name varchar(255),
    value varchar(255),
    requiredPrivilege_id VARCHAR(36),
    primary key (id),
	constraint fk_ui_properties_app_privilege 
   		foreign key (requiredPrivilege_id) 
   		references APP_PRIVILEGE
);


