package com.bolsadeideas.springboot.backend.apirest.auth;

public class JwtConfig {
	
	public static final String LLAVE_SECRETA = "alguna.clave.secreta.12345678";
	
	public static final String RSA_PRIVADA = "-----BEGIN RSA PRIVATE KEY-----\r\n"
			+ "MIIEogIBAAKCAQEApmrG6s8cqqn4OCIfKjNf3P2ZDEEbERRDpit5yNyyMNCZUfWT\r\n"
			+ "UXfJ51U3cc/CXUIQhq0K7uJycamHNNYG8B3LoICMbQzU5+jLTiIxQuw/MH/eX6Vq\r\n"
			+ "lN9GfNQCSL/8h50YqH2LvFWbcb3k96hkavOYCQQD6TjKbAcuRxJIrm6J1AKZB3bx\r\n"
			+ "FvGTrm2VSMwIlGMmtC4o77T5UlpDvyNArdfAp9Xowlj37gyO86wqzJFEFpAg/2LR\r\n"
			+ "ZrwGiNOhLl1v2kdR+vDecZnPIhpNQi10YnJgHlmgLfY2ba43r+rLkPultv05/LJ0\r\n"
			+ "IedELw7to/bcUCU3oZtWtqq5vGgEXFLFqlt9IQIDAQABAoIBAFh91PKNWWAC68Pl\r\n"
			+ "mQ7WrLYVf+m9QQhO7z4QRj0h5fsBIVYssL6UZR+G9+mkIWV3uNP0dija7yIzlHrr\r\n"
			+ "CFtsbJgXYxSlyxzadClDE1DT0TIX/IZ9rnQlWhUMo35N4Jm4VqFZyRFHsFXGNVfg\r\n"
			+ "Ci25BHJe2TmOAk15cAlI1q8yhkXek8s1LA4cDYCX7cdrhwCZKE7hky8oJq5xhStO\r\n"
			+ "C+1jaQWBFTOfMZk1TR5/bpmNfuYIF2kHuVj46hSP9SOld86JNUi37hj8BtTWcbHv\r\n"
			+ "dn9hJleLxVejFWoJHuAPT4Dyoq1sD7tUV4s40J88I7i6JP2/4S2h3BY67Ahu5ZS7\r\n"
			+ "X1IAXMECgYEA3CRMbmQGM3DJxj/CLgbL+oB+jg2sJEsJeDpA14bjqs9BcI9c5HKl\r\n"
			+ "v0r0mMJXDdezfkqTnfNLHGq46NeWAmvIxNqPNbAzIYUn2/w6NxVXZtTa7JFC+Sug\r\n"
			+ "aPt39ub/vIVmo7C8rWPLDqtb2Pr2/wiOTl1pDawp5H3M4G6IYKnciOkCgYEAwYY1\r\n"
			+ "1gtXmYjfzPQuVo1iN1hwUaVAXJCaZa7ddxd1U9T+jhH/kjggvEgmb20CEDJlU4fK\r\n"
			+ "0ApAiJTftkcVYxLh7dJ37RxFGd8rRF1PKBCsLwwU65uFjANs8EKOHextaLZNds8Z\r\n"
			+ "lOGeNkNsiZ+xbvVhsKtRqXxYBEzfVx5NxQacL3kCgYAmzAbkVaB6JGCLHeV88xmz\r\n"
			+ "1j13j5VM+CR9GdcfpNgu3EPuMHXwlPv9EJq26VkqSV+K3F3TsnMEWRKphoUbfB9w\r\n"
			+ "AgzHK3x3Zd42eOdRmeNDbjP/CULCYxvsJJVp4CAl+2SxaI54CGRa+3w+a0xoefuK\r\n"
			+ "eA/xpuvjJwCadSB32LfTMQKBgHdoDQ29v9Y/Cv/V5kWHRQOrMNpfoT+8BVgaNhHG\r\n"
			+ "SqFoOYyFdHDO6vvhdL2pv+0oeza4AZ6txLXBTeuVHpAb1YU9KLwHhmd5OKQdArtQ\r\n"
			+ "1jzNMpdRRWxnrK7uEexKthM28MMO89TWBR2sKmscOomhJB6zBlcSHujAWcnSK+AW\r\n"
			+ "vQXZAoGAChfa3LMNM7PG/A+VzUg9mrMamXQDMvWsOygQ724FXWWYbLxKa3KAO3f4\r\n"
			+ "plcSYoTsEw1nqmgu6aEWFxyLT8n8uSWALbwjBDjhWe/xSCHao/4fbr6WP5QWZ55T\r\n"
			+ "zVH8OeZanpo4uXn7/Zx5j/p0JdTLPLmVvlAdkzo/qxkW71KZmtQ=\r\n"
			+ "-----END RSA PRIVATE KEY-----";
	
	public static final String RSA_PUBLICA = "-----BEGIN PUBLIC KEY-----\r\n"
			+ "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApmrG6s8cqqn4OCIfKjNf\r\n"
			+ "3P2ZDEEbERRDpit5yNyyMNCZUfWTUXfJ51U3cc/CXUIQhq0K7uJycamHNNYG8B3L\r\n"
			+ "oICMbQzU5+jLTiIxQuw/MH/eX6VqlN9GfNQCSL/8h50YqH2LvFWbcb3k96hkavOY\r\n"
			+ "CQQD6TjKbAcuRxJIrm6J1AKZB3bxFvGTrm2VSMwIlGMmtC4o77T5UlpDvyNArdfA\r\n"
			+ "p9Xowlj37gyO86wqzJFEFpAg/2LRZrwGiNOhLl1v2kdR+vDecZnPIhpNQi10YnJg\r\n"
			+ "HlmgLfY2ba43r+rLkPultv05/LJ0IedELw7to/bcUCU3oZtWtqq5vGgEXFLFqlt9\r\n"
			+ "IQIDAQAB\r\n"
			+ "-----END PUBLIC KEY-----";

}
