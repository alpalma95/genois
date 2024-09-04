export interface GenoisConfig {
    main_container: string;
    env: string;
    composer_file: string;
    aliases: Record<string, string>;
}