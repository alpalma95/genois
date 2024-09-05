export interface GenoisConfig {
    main_container?: string;
    env?: string;
    compose_file?: string;
    aliases?: Record<string, string>;
    genois_env?: GenoisEnv;
}

export interface GenoisEnv { 
    [key: string]: GenoisConfig;
}