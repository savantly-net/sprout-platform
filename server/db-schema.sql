
    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    create table sprout.APP_EMAIL_ADDRESS (
       emailAddress varchar(255) not null,
        IS_PRIMARY boolean,
        verified boolean not null,
        user_id CHAR(36),
        primary key (emailAddress)
    );

    create table sprout.APP_ORGANIZATION (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.APP_SETTING (
       id varchar(255) not null,
        value varchar(255),
        primary key (id)
    );

    create table sprout.APP_USER_EMAIL_ADDRESS (
       SproutUserEntity_id CHAR(36) not null,
        emailAddresses_emailAddress varchar(255) not null,
        primary key (SproutUserEntity_id, emailAddresses_emailAddress)
    );

    create table sprout.CONTENT_FIELD (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        displayName varchar(255),
        fieldType integer,
        name varchar(255),
        required boolean not null,
        sortOrder integer not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_ITEM (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        contentType_id CHAR(36),
        template_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        content clob,
        description varchar(255),
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.CONTENT_TEMPLATE_CONTENT_ITEM (
       ContentTemplate_id CHAR(36) not null,
        contentItems_id CHAR(36) not null,
        primary key (ContentTemplate_id, contentItems_id)
    );

    create table sprout.CONTENT_TYPE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        icon varchar(255),
        name varchar(255),
        requiresTemplate boolean not null,
        updateable boolean not null,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.FIELD_VALUES (
       CONTENT_ITEM_ID CHAR(36) not null,
        CONTENT_FIELD_VALUE clob,
        fieldValues_KEY CHAR(36) not null,
        primary key (CONTENT_ITEM_ID, fieldValues_KEY)
    );

    create table sprout.MENU (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        _public boolean not null,
        disabled boolean not null,
        displayText varchar(255),
        icon varchar(255),
        position integer not null,
        url varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        PARENT_ID CHAR(36),
        primary key (id)
    );

    create table sprout.MENU_ROLES (
       Menu_id CHAR(36) not null,
        roles varchar(255)
    );

    create table sprout.OAUTH_ACCOUNT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        provider varchar(255),
        token varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Privilege (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.Role (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.roles_privileges (
       role_id CHAR(36) not null,
        privilege_id CHAR(36) not null,
        primary key (role_id, privilege_id)
    );

    create table sprout.SproutModuleRegistration (
       id CHAR(36) not null,
        enabled boolean not null,
        installed boolean not null,
        name varchar(255),
        primary key (id)
    );

    create table sprout.SproutUserEntity (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        accountNonExpired boolean not null,
        accountNonLocked boolean not null,
        clearTextPassword varchar(255),
        credentialsNonExpired boolean not null,
        displayName varchar(255),
        enabled boolean not null,
        firstName varchar(255),
        hidePrimaryEmailAddress boolean not null,
        lastName varchar(255),
        password varchar(60),
        phoneNumber varchar(255),
        username varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        organization_id CHAR(36),
        primary key (id)
    );

    create table sprout.SproutUserEntity_OAUTH_ACCOUNT (
       SproutUserEntity_id CHAR(36) not null,
        oAuthAccounts_id CHAR(36) not null,
        primary key (SproutUserEntity_id, oAuthAccounts_id)
    );

    create table sprout.TENANT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.TenantEntity_aliases (
       TenantEntity_id CHAR(36) not null,
        aliases varchar(255)
    );

    create table sprout.users_roles (
       user_id CHAR(36) not null,
        role_id CHAR(36) not null,
        primary key (user_id, role_id)
    );

    create table sprout.WEB_PAGE (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        home boolean not null,
        name varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageLayout_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        placeHolderId varchar(255),
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        webPageId CHAR(36) not null,
        primary key (id)
    );

    create table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM (
       WebPageContent_id CHAR(36) not null,
        contentItems_id CHAR(36) not null
    );

    create table sprout.WEB_PAGE_LAYOUT (
       id CHAR(36) not null,
        createdDate timestamp,
        lastModifiedDate timestamp,
        description varchar(255),
        name varchar(255),
        showFooter boolean not null,
        showHeader boolean not null,
        template clob,
        createdBy_id CHAR(36),
        lastModifiedBy_id CHAR(36),
        primary key (id)
    );

    create table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER (
       WebPageLayout_id CHAR(36) not null,
        placeHolders varchar(255)
    );

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint UK_sjnmk2yq84bgbuajwwjduhrmc unique (emailAddresses_emailAddress);

    alter table sprout.CONTENT_ITEM 
       add constraint UK_ixryr2t7j4oqywctb9n56p83i unique (name);

    alter table sprout.CONTENT_TEMPLATE 
       add constraint UK_3w365n2wpfwulx1ucaherjkxg unique (name);

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint UK_eqgi22v3h08i4l9agpk5o6tuk unique (contentItems_id);

    alter table sprout.CONTENT_TYPE 
       add constraint UK_29yefw2xspftysxj5y3jga2u4 unique (name);

    alter table sprout.SproutUserEntity 
       add constraint UK_kx1mb5mce88fdespshsnpu651 unique (username);

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint UK_nyocjlnoegwrhqus5509ftgt8 unique (oAuthAccounts_id);

    alter table sprout.WEB_PAGE 
       add constraint UK_ftb52fk5cgfmpt7tq7ynf4g1w unique (name);

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint UKqa9pc0tmih3ol4ysst3itaspy unique (webPageId, placeHolderId);

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint UK_68gpw0l1ehlr10bnn3mfkp6ht unique (name);

    alter table sprout.APP_EMAIL_ADDRESS 
       add constraint FKsjvmetedltw7d7hegp2xcduae 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FKmq3nk436oy8oancdb0gomvam1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_ORGANIZATION 
       add constraint FK853wi0bypbjashmgvcr7liyww 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FK3bx4te9vk9tysjdtu0373okrt 
       foreign key (emailAddresses_emailAddress) 
       references sprout.APP_EMAIL_ADDRESS;

    alter table sprout.APP_USER_EMAIL_ADDRESS 
       add constraint FKmexebkxwbmig1s4lvn94ngamq 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKaivryoc1qmub6h46y8htotjdc 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKnrfdggcbcuk6dcyp8gx153exk 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_FIELD 
       add constraint FKqnxrg37axuc3ab77l6iatqkbi 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKi0kqyy1qg3aa5g7hc0ibkkgi1 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKiwy1jqonyp96sr2i09oqybmgn 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_ITEM 
       add constraint FKrg7f9hpl9ewcmukoxisxii57t 
       foreign key (contentType_id) 
       references sprout.CONTENT_TYPE;

    alter table sprout.CONTENT_ITEM 
       add constraint FKjwb0rmyio31o5k6yxuuoj3oys 
       foreign key (template_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FKpwc99thaaukxsa10wokh99e5g 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE 
       add constraint FK6xg8gngu71hb34bypmj95g8ci 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKo31txq3mnemsmho4bmeerg9oy 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.CONTENT_TEMPLATE_CONTENT_ITEM 
       add constraint FKp7nxh6myhubj64amkfsqm8k1t 
       foreign key (ContentTemplate_id) 
       references sprout.CONTENT_TEMPLATE;

    alter table sprout.CONTENT_TYPE 
       add constraint FKhejtnvma9l2i5keowun12q16c 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.CONTENT_TYPE 
       add constraint FK6i4h4nan2el2kkrct8hsqox20 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.FIELD_VALUES 
       add constraint FKsgmd8u14gw4gl8ilbcq1rpgtw 
       foreign key (fieldValues_KEY) 
       references sprout.CONTENT_FIELD;

    alter table sprout.FIELD_VALUES 
       add constraint FK417w3k691xud90h5rlugw871o 
       foreign key (CONTENT_ITEM_ID) 
       references sprout.CONTENT_ITEM;

    alter table sprout.MENU 
       add constraint FKko4p4erl9b8mg96qinre9by2b 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK25dw7yks5y8r0yw9dbppxxsvm 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.MENU 
       add constraint FK263eq7c7fssswy4ul5q2yoorf 
       foreign key (PARENT_ID) 
       references sprout.MENU;

    alter table sprout.MENU_ROLES 
       add constraint FKoxr7fc6rbtvlxcju9vlt2sgdh 
       foreign key (Menu_id) 
       references sprout.MENU;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FKds55a740n8gqtft7k28mfcp9s 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.OAUTH_ACCOUNT 
       add constraint FK12ctbknuhpyf6jh5s33vnj7ac 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FK9mq133cjwopfe3sbooruiyede 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Privilege 
       add constraint FKjuvhyvlilvd0xpdpa3y0mk6la 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKdrca72976x1l5lnof23ykf9v4 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.Role 
       add constraint FKrlqllkda3yy0t6m0wo67c1r1f 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.roles_privileges 
       add constraint FKp0x1d9k5aksyqd1akwwfkh0ki 
       foreign key (privilege_id) 
       references sprout.Privilege;

    alter table sprout.roles_privileges 
       add constraint FK2rfl694fu6ls2f2mqcxesqc6p 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.SproutUserEntity 
       add constraint FKqhr0f9a8ok09swmxcu9bs7hkr 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FKkedncbxt789vo098hhmiu00vo 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.SproutUserEntity 
       add constraint FK8or9iqrn8lcskgasxhfp6o3gk 
       foreign key (organization_id) 
       references sprout.APP_ORGANIZATION;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKghfkqe1myw5xytpn2y4hdnj5e 
       foreign key (oAuthAccounts_id) 
       references sprout.OAUTH_ACCOUNT;

    alter table sprout.SproutUserEntity_OAUTH_ACCOUNT 
       add constraint FKa8n4gfu6st119lctn35tg07nt 
       foreign key (SproutUserEntity_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKkeklmd14l10w0t3mbeb1hsro3 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TENANT 
       add constraint FKcs8qt1lkqth66nqm3b2c06np7 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.TenantEntity_aliases 
       add constraint FK52gloxy4ioo3nw74kou1grorq 
       foreign key (TenantEntity_id) 
       references sprout.TENANT;

    alter table sprout.users_roles 
       add constraint FKa9r8g5hiyy57ts5u4tkf0lbab 
       foreign key (role_id) 
       references sprout.Role;

    alter table sprout.users_roles 
       add constraint FKl0nbq0uruqlov72oxsm2lw2b0 
       foreign key (user_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKq07ayydqrd043h5vpd4lgcupj 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKcocjc41hv4kqy4gs2q7i1jky8 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE 
       add constraint FKrt3159uhog03d97vu94oh83y5 
       foreign key (webPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKd8e0xpq08w17u6x1dx0ywmbtn 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FKk1pqhmdh60xfym78aqmk5o9ol 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_CONTENT 
       add constraint FK2f9thn2c84bhd1uev4yykave7 
       foreign key (webPageId) 
       references sprout.WEB_PAGE;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FKlrjrtbsmtpvhw2co7cnhe3tph 
       foreign key (contentItems_id) 
       references sprout.CONTENT_ITEM;

    alter table sprout.WEB_PAGE_CONTENT_CONTENT_ITEM 
       add constraint FK6fwdwe3lnyhy1ejo9es2flk2u 
       foreign key (WebPageContent_id) 
       references sprout.WEB_PAGE_CONTENT;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKqnxkq83p4m1v7rom1moo7kdci 
       foreign key (createdBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT 
       add constraint FKj0q0ga71jtxoment2eti82s4y 
       foreign key (lastModifiedBy_id) 
       references sprout.SproutUserEntity;

    alter table sprout.WEB_PAGE_LAYOUT_PLACEHOLDER 
       add constraint FK5hi52ap0h0f127qfj7mf0flnu 
       foreign key (WebPageLayout_id) 
       references sprout.WEB_PAGE_LAYOUT;
