import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import useRegister from "@/hooks/useRegister";

const RegisterForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    fullname,
    setFullname,
    errors,
    loading,
    success,
    handleSubmit,
  } = useRegister();

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="bg-green-100 text-green-700 p-4 rounded-md">
          <h3 className="text-lg font-semibold">Inscription réussie!</h3>
          <p>Votre compte a été créé avec succès.</p>
        </div>
        <Button variant="primary" href="/login">
          Se connecter
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center gap-4 w-full max-w-md"
    >
      <Input
        type="text"
        label="Nom complet"
        variant="primary"
        placeholder="John Doe"
        fullWidth
        required
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        error={errors?.fullname}
      />
      <Input
        type="email"
        label="Email"
        variant="primary"
        placeholder="user@mail.com"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors?.email}
      />
      <Input
        type="password"
        label="Mot de passe"
        variant="primary"
        placeholder="••••••••"
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors?.password}
      />
      <Input
        type="password"
        label="Confirmer le mot de passe"
        variant="primary"
        placeholder="••••••••"
        fullWidth
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors?.confirmPassword}
      />

      {errors?.general && (
        <div className="text-red-500 text-sm">{errors.general}</div>
      )}

      <div className="flex justify-center gap-4 mt-2">
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          loadingText="Inscription en cours..."
        >
          S'inscrire
        </Button>
        <Button variant="link" href="/login">
          Déjà inscrit ?
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;