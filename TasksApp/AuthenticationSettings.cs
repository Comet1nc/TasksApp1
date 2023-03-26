namespace TasksApp
{
    public class AuthenticationSettings
    {
        public string JwtKey { get; set; }
        public double JwtExpireMinutes { get; set; }
        public string JwtIssuer { get; set; }
    }
}
