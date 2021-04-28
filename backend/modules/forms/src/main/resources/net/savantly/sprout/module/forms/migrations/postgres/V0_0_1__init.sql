CREATE TABLE IF NOT EXISTS SF_FORM_DEFINITION
(
    item_id character varying(42) NOT NULL,
    tenant_id character varying(255) NOT NULL,
    createdby character varying(255),
    createddate timestamp without time zone,
    lastmodifiedby character varying(255),
    lastmodifieddate timestamp without time zone,
    version bigint,
    components jsonb,
    display character varying(255),
    formtype character varying(255),
    name character varying(255),
    form_path character varying(255),
    settings jsonb,
    title character varying(255),
    CONSTRAINT sf_form_definition_pkey PRIMARY KEY (item_id, tenant_id),
    CONSTRAINT uk_form_path_tenant UNIQUE (tenant_id, form_path)
);

CREATE TABLE IF NOT EXISTS SF_FORM_DEFINITION_TAGS
(
    formdefinition_item_id character varying(42) NOT NULL,
    formdefinition_tenant_id character varying(255) NOT NULL,
    tags character varying(255),
    CONSTRAINT fk_formdefinition_tags_sf_form_definition FOREIGN KEY (formdefinition_tenant_id, formdefinition_item_id)
        REFERENCES SF_FORM_DEFINITION (tenant_id, item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS SF_FORM_DATA
(
    item_id character varying(42) NOT NULL,
    tenant_id character varying(255) NOT NULL,
    createdby character varying(255),
    createddate timestamp without time zone,
    lastmodifiedby character varying(255),
    lastmodifieddate timestamp without time zone,
    version bigint,
    data jsonb,
    formdefinitionid character varying(255),
    metadata jsonb,
    CONSTRAINT formdata_pkey PRIMARY KEY (item_id, tenant_id)
);