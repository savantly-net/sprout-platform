package net.savantly.sprout.module;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import net.savantly.sprout.core.module.SproutModuleConfiguration;

@Aspect
@Component
public class SproutModuleAspect {
	
    @Pointcut("@annotation(annotation)")
    public void pointCut(SproutModuleConfiguration annotation) throws Throwable {
        System.out.println("xxxxxxxxxxxxx: SproutModuleAspect.pointCut() called with '" + annotation.value() + "'");
    }

    @Around("@annotation(annotation)")
    public Object advice(ProceedingJoinPoint joinPoint, SproutModuleConfiguration annotation) throws Throwable {
        System.out.println("xxxxxxxxxxxxx: SproutModuleAspect.advice() called with '" + annotation.value() + "'");
        return joinPoint.proceed();
    }
}
