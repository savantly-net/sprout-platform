
    create table sprout.app_email_address (
        email_address varchar(255) not null,
        is_primary boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (email_address)
    );

    create table sprout.app_organization (
        id CHAR(36) not null,
        created_by varchar(255),
        created_date timestamp,
        last_modified_by varchar(255),
        last_modified_date timestamp,
        name varchar(255),
        primary key (id)
    );

    create table sprout.app_setting (
        id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.app_user_email_address (
        sprout_user_entity_id CHAR(36) not null,
        email_addresses_email_address varchar(255) not null,
        primary key (sprout_user_entity_id, email_addresses_email_address)
    );

    create table sprout.content_field (
        id CHAR(36) not null,
        created_by varchar(255),
        created_date timestamp,
        last_modified_by varchar(255),
        last_modified_date timestamp,
        display_name varchar(255),
        field_type integer,
        name varchar(255),
        required boolean not null,
        sort_order integer not null,
        content_type_id CHAR(36),
        primary key (id)
    );

    create table sprout.content_item (
        id CHAR(36) not null,
        created_by varchar(255),
        created_date timestamp,
        last_modified_by varchar(255),
        last_modified_date timestamp,
        description varchar(255),
        name varchar(255),
        content_type_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.content_template (
        id CHAR(36) not null,
        created_by varchar(255),
        created_date timestamp,
        last_modified_by varchar(255),
        last_modified_date timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        primary key (id)
    );

    create table sprout.content_template_content_items (
        content_template_id CHAR(36) not null,
        content_items_id CHAR(36) not null,
        primary key (content_template_id, content_items_id)
    );

    create table sprout.content_type (
        id CHAR(36) not null,
        created_by varchar(255),
        created_date timestamp,
        last_modified_by varchar(255),
        last_modified_date timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requires_template boolean not null,
        updateable boolean not null,
        primary key (id)
    );

    create table sprout.field_values (
        content_item_id CHAR(36) not null,
        content_field_value clob,
        field_values_key CHAR(36) not null,
        primary key (content_item_id, field_values_key)
    );

    create table sprout.menu (
        id CHAR(36) not null,
        created_by varchar(255),
        created_date timestamp,
        last_modified_by varchar(255),
        last_modified_date timestamp,
        _public boolean not null,
        disabled boolean not null,
        display_text varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        parent_id CHAR(36),
        primary key (id)
    );

    create table sprout.menu_roles (
        menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.oauth_account (
        id CHAR(36) not null,
        created_by varchar(255),
        created_date timestamp,
        last_modified_by varchar(255),
        last_modified_date timestamp,
        provider varchar(255),
        token varchar(255),
        primary key (id)
    );

    create table sprout.privilege (
        id CHAR(36) not null,
        created_by varchar(255),
        created_date timestamp,
        last_modified_by varchar(255),
        last_modified_date timestamp,
        primary key (id)
    );

    create table sprout.role (
        id CHAR(36) not null,
        created_by varchar(255),
        created_date timestamp,
        last_modified_by varchar(255),
        last_modified_date timestamp,
        primary key (id)
    );

    create table sprout.roles_privileges (
        role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.sprout_module_registration (
        id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.sprout_user_entity (
        id CHAR(36) not null,
        created_by varchar(255),
        created_date timestamp,
        last_modified_by varchar(255),
        last_modified_date timestamp,
        account_non_expired boolean not null,
        account_non_locked boolean not null,
        credentials_non_expired boolean not null,
        display_name varchar(255),
        enabled boolean not null,
        first_name varchar(255),
        hide_primary_email_address boolean not null,
        last_name varchar(255),
        password varchar(60),
        phone_number varchar(255),
        username varchar(255),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.sprout_user_entity_o_auth_accounts (
        sprout_user_entity_id CHAR(36) not null,
        o_auth_accounts_id CHAR(36) not null,
        primary key (sprout_user_entity_id, o_auth_accounts_id)
    );

    create table sprout.users_roles (
        user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.web_page (
        id CHAR(36) not null,
        created_by varchar(255),
        created_date timestamp,
        last_modified_by varchar(255),
        last_modified_date timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        web_page_layout_id CHAR(36),
        primary key (id)
    );

    create table sprout.web_page_content (
        id CHAR(36) not null,
        created_by varchar(255),
        created_date timestamp,
        last_modified_by varchar(255),
        last_modified_date timestamp,
        place_holder_id varchar(255),
        web_page_id CHAR(36) not null,
        primary key (id)
    );

    create table sprout.web_page_content_content_items (
        web_page_content_id CHAR(36) not null,
        content_items_id CHAR(36) not null
    );

    create table sprout.web_page_layout (
        id CHAR(36) not null,
        created_by varchar(255),
        created_date timestamp,
        last_modified_by varchar(255),
        last_modified_date timestamp,
        description varchar(255),
        name varchar(255),
        show_footer boolean not null,
        show_header boolean not null,
        template clob,
        primary key (id)
    );

    create table sprout.web_page_layout_placeholder (
        web_page_layout_id CHAR(36) not null,
        place_holders varchar(255)
    );

    alter table sprout.app_user_email_address 
        add constraint UK_3dm9sa7qw4qp9r6tr5njayssa unique (email_addresses_email_address);

    alter table sprout.content_item 
        add constraint UK_1ptj5d8k4w475nakthmqbml72 unique (name);

    alter table sprout.content_template 
        add constraint UK_anymalatfu6pa9qdk59ykqovn unique (name);

    alter table sprout.content_template_content_items 
        add constraint UK_nn8j6sap70lb6vpv16hhgq57l unique (content_items_id);

    alter table sprout.content_type 
        add constraint UK_835k6p59oajhwv7t0iotr99go unique (name);

    alter table sprout.sprout_user_entity 
        add constraint UK_pmcf9ihu4cd849xym8wy8pikb unique (username);

    alter table sprout.sprout_user_entity_o_auth_accounts 
        add constraint UK_ljr1bg2p2jt2a3dbvy4je5q6 unique (o_auth_accounts_id);

    alter table sprout.web_page 
        add constraint UK_et1jyaok73j9p3vxypsupbfmv unique (name);

    alter table sprout.web_page_content 
        add constraint UKe5u9qfmgusn3upb72lypixj0k unique (web_page_id, place_holder_id);

    alter table sprout.web_page_layout 
        add constraint UK_jtaucwtf2k8d953wexll3luj1 unique (name);

    alter table sprout.app_email_address 
        add constraint FK99fphtpb6636ryd2sqr5hog8u 
        foreign key (user_id) 
        references sprout.sprout_user_entity;

    alter table sprout.app_user_email_address 
        add constraint FKt1urrsp2yiipagu3nom7j6qi 
        foreign key (email_addresses_email_address) 
        references sprout.app_email_address;

    alter table sprout.app_user_email_address 
        add constraint FKjbtne07q2blcb1w8pm2ancd7f 
        foreign key (sprout_user_entity_id) 
        references sprout.sprout_user_entity;

    alter table sprout.content_field 
        add constraint FKgo572o06qlstntluo2hru84g8 
        foreign key (content_type_id) 
        references sprout.content_type;

    alter table sprout.content_item 
        add constraint FKkkttjwk1yf2sa1tgoayycg43s 
        foreign key (content_type_id) 
        references sprout.content_type;

    alter table sprout.content_item 
        add constraint FKk83sdprjx27wicj5pvidcktlw 
        foreign key (template_id) 
        references sprout.content_template;

    alter table sprout.content_template_content_items 
        add constraint FKcppf2g6si7jg7u7o4aul2dore 
        foreign key (content_items_id) 
        references sprout.content_item;

    alter table sprout.content_template_content_items 
        add constraint FKc5ngt54bigu44919xfbjacpyv 
        foreign key (content_template_id) 
        references sprout.content_template;

    alter table sprout.field_values 
        add constraint FKj3560oek66a25q4r917c1jlfg 
        foreign key (field_values_key) 
        references sprout.content_field;

    alter table sprout.field_values 
        add constraint FKldrs3jcpwqk1vpn07mfptnfe6 
        foreign key (content_item_id) 
        references sprout.content_item;

    alter table sprout.menu 
        add constraint FKgeupubdqncc1lpgf2cn4fqwbc 
        foreign key (parent_id) 
        references sprout.menu;

    alter table sprout.menu_roles 
        add constraint FKq7k54hb6f3ngdbfpblwj68bhg 
        foreign key (menu_id) 
        references sprout.menu;

    alter table sprout.roles_privileges 
        add constraint FK5yjwxw2gvfyu76j3rgqwo685u 
        foreign key (privilege_id) 
        references sprout.privilege;

    alter table sprout.roles_privileges 
        add constraint FK9h2vewsqh8luhfq71xokh4who 
        foreign key (role_id) 
        references sprout.role;

    alter table sprout.sprout_user_entity 
        add constraint FKnyy368m8x3q0jgjg49aa146bg 
        foreign key (organization_id) 
        references sprout.app_organization;

    alter table sprout.sprout_user_entity_o_auth_accounts 
        add constraint FK64ur0auu6pox9r71r2khfxv9e 
        foreign key (o_auth_accounts_id) 
        references sprout.oauth_account;

    alter table sprout.sprout_user_entity_o_auth_accounts 
        add constraint FKfb5ryh9nxirs36ci8bnmjod18 
        foreign key (sprout_user_entity_id) 
        references sprout.sprout_user_entity;

    alter table sprout.users_roles 
        add constraint FKt4v0rrweyk393bdgt107vdx0x 
        foreign key (role_id) 
        references sprout.role;

    alter table sprout.users_roles 
        add constraint FKju2ds6cby7r1du290pju52c6x 
        foreign key (user_id) 
        references sprout.sprout_user_entity;

    alter table sprout.web_page 
        add constraint FKjmu47ca9ew4eccd6b6wy26ib5 
        foreign key (web_page_layout_id) 
        references sprout.web_page_layout;

    alter table sprout.web_page_content 
        add constraint FKjhgb1naas1afcjrlrts1k06sw 
        foreign key (web_page_id) 
        references sprout.web_page;

    alter table sprout.web_page_content_content_items 
        add constraint FKj7ra18hyo06bscind6p0534w9 
        foreign key (content_items_id) 
        references sprout.content_item;

    alter table sprout.web_page_content_content_items 
        add constraint FK3xva1g2dd823adoeh7wvytkfy 
        foreign key (web_page_content_id) 
        references sprout.web_page_content;

    alter table sprout.web_page_layout_placeholder 
        add constraint FKtqjxxknnn17msirysifs5s6n 
        foreign key (web_page_layout_id) 
        references sprout.web_page_layout;
